import React from 'react';

const OrderDetails = () => {
  const orderDetails = {
    productImages: "https://via.placeholder.com/150",
    senderName: "Joshua",
    receiverName: "Arial",
    deliveryMan: "Jhon",
    ratings: 4.5,
    deliveryTime: "12:08 PM, Fri 8 Nov, 2025",
    currentLocation: "4 Lebri Mark, Petah Tikva.",
    price: 150,
    description: "This is a high-quality product designed to meet all your needs. It is made with durable materials and offers great functionality. Ideal for daily use, it is both stylish and practical, making it a must-have for everyone."
  };

  // Function to render the rating stars
  const renderRatings = (rating) => {
    const stars = Math.round(rating);
    let starElements = [];
    for (let i = 0; i < stars; i++) {
      starElements.push('⭐');
    }
    if (stars < 5) {
      starElements.push(` (${rating})`);
    }
    return starElements;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0', backgroundColor: '#f4f4f4' }}>
      <div style={{
        maxWidth: '900px', margin: '20px auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Product Header */}
        <div style={{ textAlign: 'center' }}>
          <h1>Product Details</h1>
          <img src={orderDetails.productImages} alt="Product" style={{ maxWidth: '150px', borderRadius: '8px' }} />
        </div>

        {/* Product Info */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%' }}>
            <p><strong>Sender's Name:</strong> {orderDetails.senderName}</p>
            <p><strong>Receiver's Name:</strong> {orderDetails.receiverName}</p>
            <p><strong>Delivery Man:</strong> {orderDetails.deliveryMan}</p>
            <p><strong>Delivery Time:</strong> {orderDetails.deliveryTime}</p>
            <p><strong>Current Location:</strong> {orderDetails.currentLocation}</p>
            <p><strong>Price:</strong> ${orderDetails.price}</p>
          </div>
          <div style={{ width: '48%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p><strong>Ratings:</strong></p>
              <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                {renderRatings(orderDetails.ratings)}
              </span>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
          <p><strong>Description:</strong></p>
          <p>{orderDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
