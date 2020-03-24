import datetime
from rest_framework import viewsets, generics
from .serializers.serializers import LessonDistanceSerializer, StudyGroupSerializer, WeeksSerializer, LessonFulltimeSerializer
from .models import StudyGroup, LessonDistance, Weeks, LessonFulltime
from .utils.calcutale import GetLessonsIn3Months, GetFirstDaysOfAllWeeks, ActualizeCurrentWeek
from datetime import timedelta, date, datetime
from dateutil.relativedelta import relativedelta

class LessonDistanceViewSet(viewsets.ModelViewSet):

    ActualizeCurrentWeek()
    queryset = LessonDistance.objects.filter(date_day__lt=str(date.today() + relativedelta(months=+3)), date_day__gt=str(date.today() + relativedelta(months=-3)))
    serializer_class = LessonDistanceSerializer

class LessonFulltimeViewSet(viewsets.ModelViewSet):

    queryset = LessonFulltime.objects.all()
    serializer_class = LessonFulltimeSerializer

class StudyGroupViewSet(viewsets.ModelViewSet):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer

class WeeksViewSet(viewsets.ModelViewSet):

    queryset = Weeks.objects.all() 
    serializer_class = WeeksSerializer
