# 🧪 Walmart Blitz App - Testing Guide & Sample Barcodes

## 📋 Available Sample Barcodes

### **Valid Barcodes (In Stock Items)**
```
1234567890123 - Organic Bananas ($2.99)
2345678901234 - Whole Milk ($3.49)
3456789012345 - Sourdough Bread ($4.99)
4567890123456 - Free Range Eggs ($5.99)
5678901234567 - Organic Spinach ($3.99)
6789012345678 - Greek Yogurt ($6.49)
```

### **Invalid Barcodes (For Error Testing)**
```
9999999999999 - Non-existent item
1111111111111 - Invalid format
0000000000000 - Out of stock simulation
ABCD123456789 - Invalid characters
123456789012  - Wrong length (12 digits instead of 13)
```

---

## 🔐 Login Credentials

**Demo Account:**
- **Username:** `walmart_user`
- **Password:** `blitz2024`

**Test the login flow:**
1. Try invalid credentials first (should show error)
2. Use the "Auto-fill" button for quick demo access
3. Test password visibility toggle
4. Verify loading states and animations

---

## 🎯 Test Case Categories

### **1. BASIC FUNCTIONALITY TESTS**

#### **Test Case 1.1: Valid Barcode Scanning**
**Objective**: Verify successful item addition via barcode scanning
**Steps**:
1. Go to "Scan Items" tab
2. Enter barcode: `1234567890123`
3. Click "Scan" button
4. Verify success toast appears
5. Check item appears in cart counter (header)

**Expected Result**: ✅ "Organic Bananas added to your cart" toast, cart counter increases

#### **Test Case 1.2: Invalid Barcode Handling**
**Objective**: Test error handling for invalid barcodes
**Steps**:
1. Enter barcode: `9999999999999`
2. Click "Scan"
3. Verify error message appears

**Expected Result**: ❌ "Item Not Found" error toast

#### **Test Case 1.3: Quick Add Functionality**
**Objective**: Test direct "Add to Cart" buttons
**Steps**:
1. Click "Add to Cart" on any product card
2. Verify item is added to cart
3. Repeat for multiple items

**Expected Result**: ✅ Items added successfully with toast notifications

---

### **2. CART MANAGEMENT TESTS**

#### **Test Case 2.1: Quantity Management**
**Objective**: Test quantity increase/decrease functionality
**Steps**:
1. Add item: `2345678901234` (Whole Milk)
2. Go to "My Cart" tab
3. Click "+" button to increase quantity
4. Click "-" button to decrease quantity
5. Try to decrease below 1

**Expected Result**: ✅ Quantity changes correctly, item removed when quantity reaches 0

#### **Test Case 2.2: Item Removal**
**Objective**: Test item removal from cart
**Steps**:
1. Add multiple items to cart
2. Go to "My Cart" tab
3. Click trash icon on any item
4. Verify item is removed

**Expected Result**: ✅ Item removed from cart, totals updated

#### **Test Case 2.3: Multiple Same Items**
**Objective**: Test adding same item multiple times
**Steps**:
1. Scan barcode: `3456789012345` (Sourdough Bread)
2. Scan same barcode again
3. Check cart shows quantity = 2

**Expected Result**: ✅ Quantity increases instead of duplicate entries

---

### **3. PAYMENT SYSTEM TESTS**

#### **Test Case 3.1: Successful Payment**
**Objective**: Test payment processing
**Steps**:
1. Add items: `1234567890123`, `2345678901234`
2. Go to "My Cart" tab
3. Click "Pay $6.48" button
4. Verify payment success

**Expected Result**: ✅ Payment success toast, items marked as "Paid"

#### **Test Case 3.2: Empty Cart Payment**
**Objective**: Test payment with no items
**Steps**:
1. Ensure cart is empty
2. Go to "My Cart" tab
3. Try to access payment

**Expected Result**: ✅ "Your cart is empty" message displayed

#### **Test Case 3.3: Partial Payment Scenario**
**Objective**: Test mixed paid/unpaid items
**Steps**:
1. Add 3 different items
2. Pay for items
3. Add 2 more items (unpaid)
4. Check cart status

**Expected Result**: ✅ Shows mix of paid/unpaid items with correct totals

---

### **4. STORE EXIT VALIDATION TESTS**

#### **Test Case 4.1: Exit with Unpaid Items**
**Objective**: Test exit prevention with unpaid items
**Steps**:
1. Add items: `4567890123456`, `5678901234567`
2. Don't pay for items
3. Go to "Store Exit" tab
4. Click "Attempt Exit"

**Expected Result**: ❌ Exit denied, red warning message

#### **Test Case 4.2: Exit with All Items Paid**
**Objective**: Test successful exit
**Steps**:
1. Add and pay for all items in cart
2. Go to "Store Exit" tab
3. Click "Exit Store"

**Expected Result**: ✅ Exit approved, green success message

#### **Test Case 4.3: Exit with Empty Cart**
**Objective**: Test exit with no items
**Steps**:
1. Ensure cart is empty
2. Go to "Store Exit" tab

**Expected Result**: ✅ Exit approved automatically

---

### **5. AI ASSISTANT TESTS**

#### **Test Case 5.1: Basic AI Interaction**
**Objective**: Test AI assistant responses
**Steps**:
1. Click floating AI button (bottom right)
2. Type: "How does scanning work?"
3. Click suggested responses
4. Test voice button (mic icon)

**Expected Result**: ✅ Contextual AI responses, suggestions appear

#### **Test Case 5.2: Cart Status Queries**
**Objective**: Test AI cart awareness
**Steps**:
1. Add items to cart (some paid, some unpaid)
2. Ask AI: "Check my cart status"
3. Ask: "Can I exit the store?"

**Expected Result**: ✅ AI provides accurate cart status and exit eligibility

#### **Test Case 5.3: AI Suggestions**
**Objective**: Test AI suggestion system
**Steps**:
1. Click on AI suggestion bubbles
2. Test different conversation flows
3. Ask about payment methods

**Expected Result**: ✅ Suggestions auto-fill input, relevant responses

---

### **6. EDGE CASE TESTS**

#### **Test Case 6.1: Rapid Scanning**
**Objective**: Test rapid barcode entry
**Steps**:
1. Quickly scan multiple barcodes:
   - `1234567890123`
   - `2345678901234`
   - `3456789012345`
2. Verify all items added correctly

**Expected Result**: ✅ All items processed without errors

#### **Test Case 6.2: Browser Refresh**
**Objective**: Test data persistence
**Steps**:
1. Add items to cart
2. Refresh browser page
3. Check if cart data persists

**Expected Result**: ⚠️ Cart resets (expected behavior - no persistence implemented)

#### **Test Case 6.3: Tab Switching**
**Objective**: Test state consistency across tabs
**Steps**:
1. Add items in "Scan Items" tab
2. Switch to "My Cart" tab
3. Switch to "Store Exit" tab
4. Verify consistent data

**Expected Result**: ✅ Data consistent across all tabs

---

### **7. RESPONSIVE DESIGN TESTS**

#### **Test Case 7.1: Mobile View**
**Objective**: Test mobile responsiveness
**Steps**:
1. Resize browser to mobile width (375px)
2. Test all functionality
3. Verify UI elements are accessible

**Expected Result**: ✅ App works on mobile devices

#### **Test Case 7.2: Tablet View**
**Objective**: Test tablet responsiveness
**Steps**:
1. Resize browser to tablet width (768px)
2. Test navigation and interactions

**Expected Result**: ✅ App adapts to tablet layout

---

## 🚀 Quick Test Scenarios

### **Scenario A: Happy Path Shopping**
```
1. Scan: 1234567890123 (Bananas)
2. Scan: 2345678901234 (Milk)  
3. Go to Cart → Pay $6.48
4. Go to Exit → Exit Approved ✅
```

### **Scenario B: Error Handling**
```
1. Scan: 9999999999999 (Invalid)
2. Scan: 1234567890123 (Valid)
3. Try Exit without payment → Denied ❌
4. Pay → Exit Approved ✅
```

### **Scenario C: Complex Shopping**
```
1. Add 3 items via scanning
2. Add 2 items via quick buttons
3. Remove 1 item from cart
4. Increase quantity of 1 item
5. Pay for all → Exit ✅
```

### **Scenario D: AI Assistant Flow**
```
1. Add unpaid items to cart
2. Ask AI: "Can I exit?"
3. Ask AI: "How to pay?"
4. Follow AI guidance
5. Complete purchase and exit
```

---

## 📊 Expected Test Results Summary

| Test Category | Total Tests | Expected Pass | Critical |
|---------------|-------------|---------------|----------|
| Basic Functionality | 3 | 3 | ✅ |
| Cart Management | 3 | 3 | ✅ |
| Payment System | 3 | 3 | ✅ |
| Exit Validation | 3 | 3 | ✅ |
| AI Assistant | 3 | 3 | ⭐ |
| Edge Cases | 3 | 2 | ⚠️ |
| Responsive Design | 2 | 2 | ✅ |

**Total: 20 Test Cases**

---

## 🐛 Known Limitations

1. **No Data Persistence**: Cart resets on page refresh
2. **No Real Barcode Scanner**: Manual entry only
3. **Simulated Payment**: No real payment processing
4. **Mock AI**: Predefined responses only

---

## 🎯 Testing Priority

**High Priority (Must Pass)**:
- Basic scanning and cart functionality
- Payment processing
- Exit validation

**Medium Priority**:
- AI assistant interactions
- Error handling
- Responsive design

**Low Priority**:
- Edge cases
- Performance under load
- Browser compatibility