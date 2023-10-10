from django.forms import ValidationError
from .models import Tasks
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
UserModel = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, clean_date):
        user = UserModel.objects.create_user(
            username=clean_date['username'],
            password=clean_date['password'],
        )
        user.save()
        return user

    class Meta:
        model = UserModel
        fields = ( "id", "username", "password", )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(
        label=("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        max_length=128,
        write_only=True
    )

    def check_user(self, clean_date):
        user = authenticate(username=clean_date['username'], password=clean_date['password'])
        if not user:
            return False
        return user 

    # def validate(self, data):
    #     username = data.get('username')
    #     password = data.get('password')

    #     if username and password:
    #         user = authenticate(request=self.context.get('request'),
    #                             username=username, password=password)
    #         if not user:
    #             msg = ('Unable to log in with provided credentials.')
    #             raise serializers.ValidationError(msg, code='authorization')
    #     else:
    #         msg = ('Must include "username" and "password".')
    #         raise serializers.ValidationError(msg, code='authorization')

    #     data['user'] = user
    #     return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username']



class TasksSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
    source="user.username",
    read_only=True, 
    default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Tasks
        fields = '__all__'
        