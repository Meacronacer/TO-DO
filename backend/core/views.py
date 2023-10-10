from typing import Any
from django.shortcuts import redirect
from django.urls import reverse_lazy
from .models import Tasks
from .forms import *
from django.views.generic.edit import CreateView
from django.contrib.auth import logout, login
from django.contrib.auth.views import LoginView
from django.views.generic.edit import DeleteView, UpdateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework.authentication import SessionAuthentication
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import *

class UserRergisterAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        clean_date = request.data
        serializer = UserCreateSerializer(data=clean_date)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_date)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
            

class LoginUserAPI(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            if not user:
                return Response(status=status.HTTP_404_NOT_FOUND)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutUserAPI(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)



class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return super().get_queryset()
        
        return super().get_queryset().filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#--------------------------------- rest ----------------------------------

class Home(ListView):
    model = Tasks
    template_name = 'core/todo.html'
    context_object_name = 'items'

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super(Home, self).get_context_data(**kwargs)
        if self.request.user.is_authenticated:
            context['items'] = context['items'].filter(user=self.request.user)
            context['count'] = context['items'].filter(complete=False).count()
        else:
            context['items'] = []
        context['form'] = TasksForm()
        return context
    
    def post(self, request):
        form = TasksForm(request.POST)
        if form.is_valid():
            form.instance.user = self.request.user
            form.save()
            
        return redirect('/')


class UpdateTask(LoginRequiredMixin, UpdateView):
    model = Tasks
    form_class = TasksForm
    template_name = 'core/update.html'
    success_url = '/'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)

class DeleteTask(LoginRequiredMixin, DeleteView):
    model = Tasks
    template_name = 'core/delete.html'
    context_object_name = 'task'
    success_url = '/'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)


class RegistrationUser(CreateView):
    form_class = CreateUserForm
    template_name = 'core/registration.html'
    success_url = reverse_lazy('home')


    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('home')
    

class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'core/login.html'

    def get_success_url(self):
        return reverse_lazy('home')


def logout_user(request):
    logout(request)
    return redirect('home')