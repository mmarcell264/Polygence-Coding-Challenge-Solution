from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Spending
from .serializers import SpendingSerializer
from django.utils import timezone
from django.urls import reverse
import datetime

# Create your tests here.


class TestSpendingModel(TestCase):
    def setUp(self):
        self.spending_1 = Spending(description="window", amount=100, spent_at=timezone.now(), currency="USD")
        self.spending_1.save()
        self.spending_2 = Spending(description="car", amount=60000, spent_at=timezone.now()+datetime.timedelta(days=1),
                                   currency="USD")
        self.spending_2.save()

    def test_create_spending(self):
        self.assertIsInstance(self.spending_1, Spending)
        self.assertIsInstance(self.spending_2, Spending)

    def test_spending_ordering(self):
        spendings = Spending.objects.all()
        self.assertEqual(spendings[0].spent_at, self.spending_2.spent_at)


class TestSpendingSerializer(APITestCase):
    def setUp(self):
        self.valid_spending = Spending(description="window", amount=100, spent_at=timezone.now(), currency="USD")
        self.valid_spending.save()
        self.invalid_spending_negative_amount = Spending(description="car", amount=-19000, spent_at=timezone.now(),
                                                         currency="USD")
        self.invalid_spending_negative_amount.save()
        self.invalid_spending_too_long_currency = Spending(description="car", amount=-19000, spent_at=timezone.now(),
                                                           currency="TooLongCurrencyName")
        self.invalid_spending_too_long_currency.save()

    def test_serialization_is_valid(self):
        serialize_spending = SpendingSerializer(self.valid_spending)
        deserialize_spending = SpendingSerializer(data=serialize_spending.data)

        self.assertTrue(deserialize_spending.is_valid())

    def test_serialization_is_invalid_cause_negative_amount(self):
        serialize_spending = SpendingSerializer(self.invalid_spending_negative_amount)
        deserialize_spending = SpendingSerializer(data=serialize_spending.data)

        self.assertFalse(deserialize_spending.is_valid())

    def test_serialization_is_invalid_cause_too_long_currency(self):
        serialize_spending = SpendingSerializer(self.invalid_spending_too_long_currency)
        deserialize_spending = SpendingSerializer(data=serialize_spending.data)

        self.assertFalse(deserialize_spending.is_valid())


class TestSpendingList(APITestCase):
    def setUp(self):
        self.spending_1 = Spending(description="window", amount=100, spent_at=timezone.now(), currency="USD")
        self.spending_1.save()
        self.spending_2 = Spending(description="car", amount=60000, spent_at=timezone.now()+datetime.timedelta(days=1),
                                   currency="USD")
        self.spending_2.save()

    def test_get_spendings(self):
        url = reverse("spending:spendings")
        response = self.client.get(url, format='json')

        self.assertEqual(len(response.data), Spending.objects.count())

    def test_post_spending_successfully(self):
        url = reverse("spending:spendings")
        data = {"description": "knife", "amount": 5, "spent_at": timezone.now(),"currency":"USD"}

        response = self.client.post(url, data ,format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Spending.objects.count(), 3)

    def test_post_spending_successfully(self):
        url = reverse("spending:spendings")
        data = {"description": "knife", "amount": -5, "spent_at": timezone.now(),"currency":"USD"}

        response = self.client.post(url, data ,format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Spending.objects.count(), 2)




