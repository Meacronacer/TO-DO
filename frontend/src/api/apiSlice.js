import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    tagTypes:['Tasks'],
    credentials: 'include',
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => ({
                url: '/api/tasks/',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Tasks']
        }),
        createTask: builder.mutation({
            query: task => ({
                url: '/api/tasks/',
                method: 'POST',
                headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                body: task,
                credentials: 'include'
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation({
            query: ({id, item}) => ({
                url: `/api/tasks/${id}/`,
                method: 'PUT',
                headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                body: item,
                credentials: 'include'
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation({
            query: id => ({
                url: `/api/tasks/${id}`,
                method: 'DELETE',
                headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                credentials: 'include'
            }),
            invalidatesTags: ['Tasks']
        })
    })
});

export const authApi = apiSlice.injectEndpoints({
    reducerPath: 'authUser',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    credentials: 'include',
    endpoints: builder => ({
        authUser: builder.mutation({
            query: ({username, password}) => ({
                url: '/api/login/',
                method: 'POST',
                body: {username, password},
                headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                credentials: 'include'
            }),
            invalidatesTags: ['Tasks']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/logout/',
                method: 'GET',
                headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                credentials: 'include'
            })
        }),
        registerUser: builder.mutation({
            query: ({username, password}) => ({
                url: '/api/register/',
                method: 'POST',
                headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                body: {username, password},
                credentials: 'include'
            })
        })
    })
})

export const { useAuthUserMutation, useLogoutUserMutation, useRegisterUserMutation } = authApi;

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = apiSlice;
