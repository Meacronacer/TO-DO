from django.urls import path, include
from core.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tasks', TasksViewSet)

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('update/<str:pk>', UpdateTask.as_view(), name='update_task'),
    path('delete/<str:pk>', DeleteTask.as_view(), name='delete_task'),
    path('registration/', RegistrationUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(redirect_authenticated_user=True), name='login'),
    path('logout/', logout_user, name='logout'),

    path('api/', include(router.urls)),
    path('api/login/', LoginUserAPI.as_view(), name='login-user'),
    path('api/logout/', LogoutUserAPI.as_view(), name='logout-user'),
    path('api/register/', UserRergisterAPI.as_view(), name='register-user')
]