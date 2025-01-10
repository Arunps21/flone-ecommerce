import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Invoice = () => {
  const location = useLocation();
  const { orderId } = location.state;
  const [user, setUser] = useState({});

  const { token, backendUrl } = useContext(ShopContext);

  const getOrder = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/order/getorder/${orderId}`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setUser(data.order);
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  useEffect(() => {
    getOrder();
  }, [orderId, token]);

  // PDF styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      color: "#262626",
      fontFamily: "Helvetica",
      fontSize: "12px",
      padding: "30px 50px",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontFamily: "Helvetica-Bold",
    },
    section: {
      marginBottom: 20,
    },
    table: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      padding: 8,
    },
    tableHeader: {
      backgroundColor: "#f5f5f5",
      fontFamily: "Helvetica-Bold",
    },
    tableCell: {
      flex: 1,
      textAlign: "left",
      padding: 5,
    },
    totals: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  // PDF Document Component
  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>{new Date(user?.createdAt).toLocaleDateString()}</Text>
          </View>
          <View>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Flone</Text>
            <Text>123 Business Street</Text>
            <Text>City, State, 12345</Text>
          </View>
        </View>

        {/* Billing Information */}
        <View style={styles.section}>
          <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 10 }}>
            Bill To:
          </Text>
          <Text>
            {user?.address?.firstname || "Client First Name"}{" "}
            {user?.address?.lastname || "Client Last Name"}
          </Text>
          <Text>{user?.address?.street || "Client Address"}</Text>
          <Text>
            {user?.address?.city || "City"}, {user?.address?.zipcode || "City"}
          </Text>
        </View>

        {/* Order Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Price</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {user?.products?.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{item.productId.name}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.productId.price}</Text>
              <Text style={styles.tableCell}>
                {item.productId.price * item.quantity}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totals}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Delivery Fee:</Text>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>10</Text>
        </View>
        <View style={styles.totals}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Grand Total:</Text>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>
            {user?.amount || "0.00"}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="max-w-4xl mx-auto my-10">
      {/* PDF Viewer */}
      <div className="w-full h-[500px]">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF />
        </PDFViewer>
      </div>

      {/* Download Button */}
      <div className="mt-6 flex justify-center">
        <PDFDownloadLink
          document={<InvoicePDF />}
          fileName={`invoice_${orderId}.pdf`}
        >
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Download Invoice
          </button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Invoice;
