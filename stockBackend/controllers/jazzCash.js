import crypto from 'crypto';
import express from 'express';
const router = express.Router();

const config = {
  merchantId: 'MC198538',
  password: '9th3594x79',  // from dashboard
  integritySalt: 'ut5b0xzghe', // from dashboard
  returnUrl: 'https://payment-gateway-git-main-coderstudents-projects.vercel.app/payment-success',
};

router.post('/payments/pay', async (req, res) => {
  const date = new Date();
  const dateTime = date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14); // YYYYMMDDhhmmss

  const txnRefNo = 'T' + dateTime; // unique transaction reference
  const amount = '10000'; // amount in paisa (PKR 100 = 10000)

  const postData = {
    pp_Version: '1.1',
    pp_TxnType: 'MWALLET',
    pp_Language: 'EN',
    pp_MerchantID: config.merchantId,
    pp_Password: config.password,
    pp_TxnRefNo: txnRefNo,
    pp_Amount: amount,
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: dateTime,
    pp_BillReference: 'ref123',
    pp_Description: 'Image Purchase',
    pp_TxnExpiryDateTime: dateTime, // ideally add +1hr
    pp_ReturnURL: config.returnUrl,
    pp_SecureHash: '',
  };

  // Create secure hash
  const sorted = Object.keys(postData)
    .sort()
    .filter(key => key !== 'pp_SecureHash')
    .map(key => postData[key])
    .join('&');

  const hashString = config.integritySalt + '&' + sorted;
  const hash = crypto.createHmac('sha256', config.integritySalt).update(hashString).digest('hex').toUpperCase();
  postData.pp_SecureHash = hash;

  // Auto-submit form
  let formHtml = `<form id="jazzcash-form" method="POST" action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/">`;
  for (const key in postData) {
    formHtml += `<input type="hidden" name="${key}" value="${postData[key]}" />`;
  }
  formHtml += `</form><script>document.getElementById('jazzcash-form').submit();</script>`;

  console.log('Return URL:', postData.pp_ReturnURL);
console.log('Full Form Data:', postData);

  res.send(formHtml);
});

export default router;
