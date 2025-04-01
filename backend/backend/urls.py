
from django.contrib import admin
from django.urls import path
from app import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    # ----------------------------------Users----------------------------------
    path("api/user/register/", views.CreateUserView.as_view() ,name="Creation-of-Users"),
    path('api/user/', views.UserInfoView.as_view(), name='user-info'),

    # ----------------------------------Todos----------------------------------
    path('api/todos/', views.TodoListView.as_view(), name='todo-list'),
    path('api/todos/<int:pk>/', views.TodoDetailView.as_view(), name='todo-detail'),

    # ----------------------------------Tokens-------------------------------------
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
