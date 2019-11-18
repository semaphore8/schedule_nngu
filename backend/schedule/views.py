import datetime
from rest_framework import viewsets, generics
from .serializers.serializers import LessonSerializer, StudyGroupSerializer, WeeksSerializer
from .models import StudyGroup, Lesson, Weeks
from .utils.calcutale import GetLessonsIn3Months, GetFirstDaysOfAllWeeks, ActualizeCurrentWeek
from datetime import timedelta, date, datetime
from dateutil.relativedelta import relativedelta

class LessonViewSet(viewsets.ModelViewSet):

    ActualizeCurrentWeek()
    queryset = Lesson.objects.filter(date_day__lt=str(date.today() + relativedelta(months=+3)), date_day__gt=str(date.today() + relativedelta(months=-3)))
    serializer_class = LessonSerializer

class StudyGroupViewSet(viewsets.ModelViewSet):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer

class WeeksViewSet(viewsets.ModelViewSet):

    queryset = Weeks.objects.all() 
    serializer_class = WeeksSerializer
