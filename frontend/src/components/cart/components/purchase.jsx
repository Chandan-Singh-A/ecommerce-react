import { useState } from 'react';
import styles from './purchase.module.css';

export function PurchaseComponent({ totalPrice, onSubmit, onCancel ,setter}) {
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

  const handleSubmit = () => {
    // Here you can add form validation if needed
    const orderDetails = {
      address,
      contactNo,
      paymentMethod,
      totalPrice
    };
    onSubmit(orderDetails);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Purchase Details</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>Address:</label>
        <textarea
          className={styles.textarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Contact No:</label>
        <input
          type="text"
          className={styles.input}
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Payment Method:</label>
        <select
          className={styles.select}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="Paytm">Paytm</option>
          <option value="Google Pay">Google Pay</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Total Price:</label>
        <span className={styles.price}>${totalPrice}</span>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.cancelButton} onClick={()=>setter(false)}>Cancel</button>
        <button className={styles.submitButton} onClick={handleSubmit}>Submit Order</button>
      </div>
    </div>
  );
}