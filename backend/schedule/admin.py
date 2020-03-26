from django.contrib import admin

from .models import *
from .forms import *

class LessonDistanceAdmin(admin.ModelAdmin):

    # def get_subject_type(self, obj):
    #     return obj.subject.get_subject_type_display()
    # get_subject_type.short_description = 'Тип занятия'

    fields = ['subject', 'speaker', 'classroom', 'study_group', 'date_day', 'class_number']
    autocomplete_fields = ['subject', 'speaker']
    list_display = ('subject', 'study_group', 'date_day', 'class_number', 'speaker', 'classroom')
    list_display_links = ('subject',)
    list_filter = ['date_day', 'study_group']
    ordering = ['-date_day', 'study_group', 'class_number']

    class Media:
        js = ('admin/js/jquery.init.js', 'js/LessonsDistanceAdmin.js')
    
class LessonFulltimeAdmin(admin.ModelAdmin):

    # def get_subject_type(self, obj):
    #     return obj.subject.get_subject_type_display()
    # get_subject_type.short_description = 'Тип занятия'

    autocomplete_fields = ['subject', 'speaker']
    list_display = ('subject', 'study_group', 'class_number', 'speaker', 'classroom', 'week_parity', 'day')
    list_display_links = ('subject',)
    list_filter = ['study_group', 'week_parity', 'day']
    ordering = ['day', 'week_parity', 'study_group', 'class_number']
    
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'email', 'phone_number')
    list_filter = ['department']
    search_fields = ['name__icontains']

class WeeksAdmin(admin.ModelAdmin):
    list_display = ('week', 'current')
    readonly_fields = ('week', 'current')
    list_display_links = ('week',)

class SubjectAdmin(admin.ModelAdmin):
    fields = ['name', 'subject_type', 'load', 'speakers', 'classrooms']
    list_display = ('id', 'name', 'subject_type', 'load')
    list_display_links = ('name',)
    list_editable = ('load',)
    list_filter = ['subject_type']
    search_fields = ['name__icontains']
    filter_horizontal = ('speakers', 'classrooms')

class StudyGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'students_count', 'mode_of_study')
    list_editable = ('students_count', 'mode_of_study')
    search_fields = ['name__icontains']

class ClassroomAdmin(admin.ModelAdmin):
    # form = ClassroomForm
    list_display = ('name', 'size')
    list_editable = ('size',)
    search_fields = ['name__icontains']


admin.site.register(Classroom, ClassroomAdmin)
admin.site.register(StudyGroup, StudyGroupAdmin)
admin.site.register(LessonFulltime, LessonFulltimeAdmin)
admin.site.register(LessonDistance, LessonDistanceAdmin)
admin.site.register(Speaker, SpeakerAdmin)
admin.site.register(Weeks, WeeksAdmin)
admin.site.register(Subject, SubjectAdmin)