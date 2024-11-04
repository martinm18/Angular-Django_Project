from django.db import models, transaction
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')])

    def __str__(self):
        return f"Order {self.id} - {self.customer.name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def save(self, *args, **kwargs):
        # Check if there's enough stock to fulfill the order
        if self.product.stock < self.quantity:
            raise ValidationError("Not enough stock available.")

        if not self.order_id:
            raise ValidationError("Order must be assigned before saving an OrderItem.")

        # Use atomic transaction to ensure stock is only deducted if the item is saved successfully
        with transaction.atomic():
            # Deduct stock
            self.product.stock -= self.quantity
            self.product.save()
            super(OrderItem, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class User(AbstractUser):
     # Dodajte svoj role ili druge specifične atribute
    role = models.CharField(max_length=20, choices=[('admin', 'Admin'), ('customer', 'Customer')])

    # Dodajte related_name argument
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Promijenite naziv ovdje
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set',  # Promijenite naziv ovdje
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )