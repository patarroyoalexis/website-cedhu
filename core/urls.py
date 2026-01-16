from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Ahora existe la vista home
    path('login/', views.login_view, name='login'),
    path('Nosotros/', views.Nosotros_view, name='Nosotros'),
    path('Admisiones/', views.Admisiones_view, name='Admisiones'),
    path('Oferta_Educativa', views.Oferta_Educativa_view, name='Oferta_Educativa'),
    path('Servicios_en_linea', views.Servicios_en_linea_view, name='Servicios_en_linea'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),

    path('logout/', views.logout_view, name='logout'),
    path('panel/', views.panel_admin, name='panel_admin'),
    path('panel/toggle-user/<int:user_id>/', views.toggle_user, name='toggle_user'),
    path('panel/delete-user/<int:user_id>/', views.delete_user, name='delete_user'),
    path('panel/gestionar-inicio/', views.gestionar_inicio, name='gestionar_inicio'),
]







