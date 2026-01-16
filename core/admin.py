from django.contrib import admin
from .models import ContenidoInicio, Evento # Se importa el modelo Horario

@admin.register(ContenidoInicio)
class ContenidoInicioAdmin(admin.ModelAdmin):
    list_display = ('titulo_galeria', 'texto_direccion', 'imagen_manual')

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'fecha', 'hora', 'portada_display')
    list_filter = ('fecha',)
    search_fields = ('nombre', 'descripcion')

    def portada_display(self, obj):
        if obj.portada:
            from django.utils.html import format_html
            return format_html(f'<img src="{obj.portada.url}" style="width: 100px; height: auto;" />')
        return "Sin imagen"
    portada_display.short_description = "Portada"