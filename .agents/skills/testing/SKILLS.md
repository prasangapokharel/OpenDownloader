# Testing Skill

## Purpose

This skill defines testing standards for the project.

Use this skill whenever:

* Creating tests
* Updating tests
* Fixing bugs
* Creating new features
* Refactoring code
* Adding business logic

Every feature must be testable.

---

# Test Location Rules

Never place tests beside production code.

Forbidden:

```text
internal/orders/service_test.go

internal/users/service_test.go

internal/payments/service_test.go
```

Required:

```text
backend/

    testing/

        users/
            create_user/
                create_user_test.go

            update_user/
                update_user_test.go

        orders/
            create_order/
                create_order_test.go

            cancel_order/
                cancel_order_test.go

        payments/
            create_payment/
                create_payment_test.go

        wallet/
            deduct_balance/
                deduct_balance_test.go

            refund_balance/
                refund_balance_test.go

        providers/
            create_provider_order/
                create_provider_order_test.go
```

Format:

```text
backend/testing/{module}/{scenario}/
```

Examples:

```text
backend/testing/users/create_user/

backend/testing/orders/create_order/

backend/testing/orders/refund_order/

backend/testing/payments/approve_payment/

backend/testing/wallet/deduct_balance/
```

---

# Scenario-Based Testing

Every test folder represents one business scenario.

Good:

```text
users/
    create_user/

orders/
    create_order/

wallet/
    refund_balance/
```

Bad:

```text
tests/

    test1.go
    test2.go
    random.go
```

Tests must be organized by business behavior.

---

# Required Test Types

## Unit Tests

Test:

* services
* validators
* helpers
* calculations

No database.

No HTTP.

No external APIs.

---

## Integration Tests

Test:

* repositories
* database interactions
* transactions

Use PostgreSQL.

---

## API Tests

Test:

* endpoints
* middleware
* authentication
* authorization

Use HTTP requests.

---

## Business Flow Tests

Test complete workflows.

Example:

```text
Create User
 ↓
Deposit Balance
 ↓
Create Order
 ↓
Deduct Balance
 ↓
Provider Order
```

Entire flow must succeed.

---

# Naming Rules

Test file:

```text
create_order_test.go
```

Test function:

```go
func TestCreateOrder_Success(t *testing.T)
```

```go
func TestCreateOrder_InsufficientBalance(t *testing.T)
```

```go
func TestCreateOrder_InvalidService(t *testing.T)
```

Avoid generic names.

Bad:

```go
func TestOrder(t *testing.T)
```

---

# Coverage Rules

Minimum coverage:

```text
80%
```

Critical modules:

```text
orders
payments
wallet
providers
auth
```

Target:

```text
90%+
```

---

# Money Safety Rules

Always test:

* balance deduction
* balance refund
* payment approval
* payment rejection
* referral commission
* wallet transaction creation

Every money operation requires tests.

---

# Transaction Tests

Must verify rollback behavior.

Example:

```text
Deduct Balance
 ↓
Create Order
 ↓
Provider Fails
```

Expected:

```text
Balance Restored

No Order Created

Rollback Successful
```

---

# Provider Tests

Must mock providers.

Never call real providers.

Example:

```go
type MockProvider struct {}
```

Test:

```text
CreateOrder

OrderStatus

Refill

Cancel
```

---

# Authentication Tests

Must verify:

```text
Valid JWT

Expired JWT

Missing JWT

Invalid JWT
```

---

# Authorization Tests

Must verify:

```text
orders.create

orders.view

users.edit

payments.approve
```

Permission failures must be tested.

---

# Response Tests

Every endpoint must verify:

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

and

```json
{
  "success": false,
  "message": "",
  "errors": {}
}
```

Response consistency is mandatory.

---

# Test Data Rules

Use fixtures.

Location:

```text
backend/testing/fixtures/
```

Examples:

```text
users.json

services.json

orders.json
```

Never hardcode large test data.

---

# Mock Rules

Mock:

* providers
* mail
* notifications
* storage
* queues

Do not mock:

* business logic
* domain logic

---

# Performance Tests

Required for:

```text
orders

wallet

payments

providers
```

Test:

* high load
* concurrent requests
* transaction safety

---

# Bug Fix Rules

Every bug fix must include:

1. Failing test.
2. Code fix.
3. Passing test.

Never fix bugs without tests.

---

# AI Test Generation Rules

When generating tests:

1. Create scenario folder.
2. Use business scenario naming.
3. Test success path.
4. Test failure path.
5. Test edge cases.
6. Test rollback behavior.
7. Test authorization.
8. Test validation.
9. Test response format.
10. Never place tests inside production packages.

Required structure:

```text
backend/testing/

    users/
        create_user/

    orders/
        create_order/

    payments/
        approve_payment/

    wallet/
        deduct_balance/

    providers/
        create_provider_order/
```

This structure is mandatory.
