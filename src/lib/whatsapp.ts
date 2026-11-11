import { HamperCartItem, CustomerDetails, CorporateEnquiry } from "@/types";

export const WHATSAPP_PHONE_RAW = "7829267846";
export const WHATSAPP_PHONE_INTL = "917829267846";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_PHONE_INTL}`;

/**
 * Builds an encoded WhatsApp URL for an order with customer details
 */
export function buildOrderWhatsAppUrl(
  items: HamperCartItem[],
  customer: CustomerDetails
): string {
  const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  const totalOriginal = items.reduce(
    (sum, it) => sum + it.unitOriginalPrice * it.quantity,
    0
  );
  const totalSavings = totalOriginal - subtotal;

  let message = `Hello PREMIUM NUTS!\n\n`;
  message += `I would like to place an order.\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🎁 ORDER SUMMARY\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Product: Premium Nuts & Dry Fruits Gift Hamper\n\n`;

  items.forEach((item, index) => {
    message += `Hamper #${index + 1}:\n`;
    message += `• Size: ${item.size.name} (${item.size.approxWeight})\n`;
    message += `• Quantity: ${item.quantity}\n`;
    message += `• Selected 6 Varieties:\n`;
    item.selectedIngredients.forEach((ing, i) => {
      message += `   ${i + 1}. ${ing.name}\n`;
    });
    message += `• Unit Price: ₹${item.unitPrice} (Orig. ₹${item.unitOriginalPrice})\n`;
    message += `• Line Total: ₹${item.unitPrice * item.quantity}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 PRICING BREAKDOWN\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `• Subtotal: ₹${subtotal}\n`;
  if (totalSavings > 0) {
    message += `• Total Savings: ₹${totalSavings}\n`;
  }
  message += `• Shipping: Complimentary Express Delivery\n`;
  message += `• TOTAL PAYABLE: ₹${subtotal}\n\n`;

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 CUSTOMER & DELIVERY DETAILS\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `• Name: ${customer.fullName}\n`;
  message += `• Phone: ${customer.phone}\n`;
  message += `• Address: ${customer.address}\n`;
  message += `• City: ${customer.city}\n`;
  message += `• PIN Code: ${customer.pincode}\n`;
  if (customer.deliveryInstructions?.trim()) {
    message += `• Delivery Instructions: ${customer.deliveryInstructions.trim()}\n`;
  }
  if (customer.giftMessage?.trim()) {
    message += `• Gift Message Card: "${customer.giftMessage.trim()}"\n`;
  }

  message += `\nPlease confirm availability and payment details. Thank you!`;

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds an encoded WhatsApp URL for corporate gifting enquiries
 */
export function buildCorporateWhatsAppUrl(enquiry: CorporateEnquiry): string {
  let message = `Hello PREMIUM NUTS!\n\n`;
  message += `I would like to enquire about Corporate & Bulk Gifting.\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🏢 CORPORATE ENQUIRY DETAILS\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `• Name: ${enquiry.fullName}\n`;
  message += `• Company: ${enquiry.companyName}\n`;
  message += `• Email: ${enquiry.email}\n`;
  message += `• Phone: ${enquiry.phone}\n`;
  message += `• Approximate Hampers: ${enquiry.estimatedHampers}\n`;
  message += `• Preferred Size: ${enquiry.preferredSize}\n`;
  message += `• Occasion / Event: ${enquiry.occasion}\n`;
  message += `• Target Delivery Date: ${enquiry.deliveryDate || "To be confirmed"}\n`;
  message += `• Custom Logo / Branding: ${enquiry.customBranding ? "Yes, required" : "Standard presentation"}\n`;
  if (enquiry.notes?.trim()) {
    message += `• Additional Notes: ${enquiry.notes.trim()}\n`;
  }

  message += `\nPlease share your customized corporate bulk pricing catalog. Thank you!`;

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

