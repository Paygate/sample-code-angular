/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

/* eslint consistent-return:0 import/order:0 */

const express = require('express')
const bodyParser = require('body-parser')
// var fs = require('fs');
var http = require('http');
// var https = require('https');
var cors = require('cors');
const request = require('request');
const soapRequest = require('easy-soap-request');
var convert = require('xml-js');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// var privateKey = fs.readFileSync('/etc/ssl/private.key', 'utf8');
// var certificate = fs.readFileSync('/etc/ssl/1c97c34601dfda14.crt', 'utf8');
// var caBundle = fs.readFileSync('/etc/ssl/gd_bundle-g2-g1.crt', 'utf8');
// var credentials = { key: privateKey, cert: certificate, ca: caBundle };

var server = http.createServer(app);
// var server = https.createServer(credentials, app);

var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}
//here is the magic
app.use(cors(corsOptions));

app.use('/api', (req, res, next) => {
  console.log(req.body, 'req.body');
  var url = 'https://secure.paygate.co.za' + req.url;
  return request({
    uri: url,
    method: 'POST',
    form: req.body
  }, function (error, response, body) {
    return res.status(200).json(body);
  })
});

// result page redirection
app.use('/result', (req, res, next) => {
  console.log(req.body);
  const {
    PAY_REQUEST_ID,
    TRANSACTION_STATUS,
    CHECKSUM
  } = req.body;

  return res.redirect("http://localhost:4200/result?PAY_REQUEST_ID=" + PAY_REQUEST_ID + "&TRANSACTION_STATUS=" + TRANSACTION_STATUS + "&CHECKSUM=" + CHECKSUM);
});

// endpoint for payhost
const url = 'https://secure.paygate.co.za/payhost/process.trans';
const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'https://secure.paygate.co.za/payhost/process.trans?wsdl',
};
app.use('/payhost-card', async (req, res, next) => {
  const { PayGateId, Password, Title, FirstName, LastName, Telephone, Mobile, Email, CardNumber, CardExpiryDate, CVV, BudgetPeriod, NotifyUrl, ReturnUrl, MerchantOrderId, Currency, Amount } = req.body;
  let result1 = `<?xml version="1.0" encoding="UTF-8" ?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.paygate.co.za/PayHOST">
    <SOAP-ENV:Body>
        <ns1:SinglePaymentRequest>
            <ns1:CardPaymentRequest>
                <ns1:Account>
                    <ns1:PayGateId>${PayGateId}</ns1:PayGateId>
                    <ns1:Password>${Password}</ns1:Password>
                </ns1:Account>
                <ns1:Customer>
                    <ns1:Title>${Title}</ns1:Title>
                    <ns1:FirstName>${FirstName}</ns1:FirstName>
                    <ns1:LastName>${LastName}</ns1:LastName>
                    <ns1:Telephone>${Telephone}</ns1:Telephone>
                    <ns1:Mobile>${Mobile}</ns1:Mobile>
                    <ns1:Email>${Email}</ns1:Email>
                </ns1:Customer>
                <ns1:CardNumber>${CardNumber}</ns1:CardNumber>
                <ns1:CardExpiryDate>${CardExpiryDate}</ns1:CardExpiryDate>
                <ns1:CVV>${CVV}</ns1:CVV>
                <ns1:BudgetPeriod>${BudgetPeriod}</ns1:BudgetPeriod>
                <ns1:Redirect>
                    <ns1:NotifyUrl>${NotifyUrl}</ns1:NotifyUrl>
                    <ns1:ReturnUrl>${ReturnUrl}</ns1:ReturnUrl>
                </ns1:Redirect>
                <ns1:Order>
                    <ns1:MerchantOrderId>${MerchantOrderId}</ns1:MerchantOrderId>
                    <ns1:Currency>${Currency}</ns1:Currency>
                    <ns1:Amount>${Amount}</ns1:Amount>
                </ns1:Order>
            </ns1:CardPaymentRequest>
        </ns1:SinglePaymentRequest>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

  // usage of module
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: result1, timeout: 10000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  try {
    var result = convert.xml2js(body, { compact: true, ignoreDeclaration: true, ignoreAttributes: true, ignoreCdata: true, ignoreDoctype: true });
    var getBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:SinglePaymentResponse']['ns2:CardPaymentResponse']['ns2:Redirect'];
    var jsonObj = {};

    jsonObj['RedirectUrl'] = getBody['ns2:RedirectUrl']['_text'];

    for (let i = 0; i < getBody['ns2:UrlParams'].length; i++) {
      jsonObj[getBody['ns2:UrlParams'][i]['ns2:key']['_text']] = getBody['ns2:UrlParams'][i]['ns2:value']['_text'];
    }

    return res.status(200).json(jsonObj);
  } catch (e) {
    return res.status(200).json(e.toString());
  }
});


app.use('/payhost-web', async (req, res, next) => {
  const { PayGateId, Reference, Title, Password, Locale, EncryptionKey, FirstName, MiddleName, LastName, Telephone, Method, Detail, Mobile, Fax, Email, DateOfBirth, SocialSecurityNumber, DeliveryDate, DeliveryMethod, InstallationRequired, Customer, Shipping, Billing, Zip, City, State, Country, AddressLine1, AddressLine2, AddressLine3, NotifyUrl, ReturnUrl, Target, TicketNumber, PNR, TravellerType, DepartureAirport, DepartureCountry, DepartureCity, DepartureDateTime, ArrivalAirport, ArrivalCountry, ArrivalCity, ArrivalDateTime, MarketingCarrierCode, MarketingCarrierName, IssuingCarrierCode, IssuingCarrierName, FlightNumber, UserKey, MerchantOrderId, Currency, Amount, Discount, TransactionDate, AccountNumber, SessionId, IpAddress, UserValue } = req.body;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.paygate.co.za/PayHOST">
      <SOAP-ENV:Body>
          <ns1:SinglePaymentRequest>
              <ns1:WebPaymentRequest>
                  <!-- Account Details -->
                  <ns1:Account>
                      <ns1:PayGateId>${PayGateId}</ns1:PayGateId>
                      <ns1:Password>${Password}</ns1:Password>
                  </ns1:Account>
                  <!-- Customer Details -->
                  <ns1:Customer>
                      <ns1:Title>${Title}</ns1:Title>
                      <ns1:FirstName>${FirstName}</ns1:FirstName>
                      <ns1:LastName>${LastName}</ns1:LastName>
                      <ns1:Email>${Email}</ns1:Email>
                      <!-- Address Details -->
                      <ns1:Address>
                          <ns1:Country>${Country}</ns1:Country>
                      </ns1:Address>
                  </ns1:Customer>
                  <!-- Redirect Details -->
                  <ns1:Redirect>
                      <ns1:NotifyUrl>${NotifyUrl}</ns1:NotifyUrl>
                      <ns1:ReturnUrl>${ReturnUrl}</ns1:ReturnUrl>
                  </ns1:Redirect>
                  <!-- Order Details -->
                  <ns1:Order>
                      <ns1:MerchantOrderId>${MerchantOrderId}</ns1:MerchantOrderId>
                      <ns1:Currency>${Currency}</ns1:Currency>
                      <ns1:Amount>${Amount}</ns1:Amount>
                      <ns1:TransactionDate>${TransactionDate}</ns1:TransactionDate>
                      <ns1:BillingDetails>
                          <!-- Customer Details -->
                          <ns1:Customer>
                              <ns1:Title>${Title}</ns1:Title>
                              <ns1:FirstName>${FirstName}</ns1:FirstName>
                              <ns1:LastName>${LastName}</ns1:LastName>
                              <ns1:Email>${Email}</ns1:Email>
                              <!-- Address Details -->
                              <ns1:Address>
                                  <ns1:Country>${Country}</ns1:Country>
                              </ns1:Address>
                          </ns1:Customer>
                          <!-- Address Details -->
                          <ns1:Address>
                              <ns1:Country>${Country}</ns1:Country>
                          </ns1:Address>
                      </ns1:BillingDetails>
                      <ns1:Locale>${Locale}</ns1:Locale>
                  </ns1:Order>
                  <!-- User Fields -->
              </ns1:WebPaymentRequest>
          </ns1:SinglePaymentRequest>
      </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>`;

  // usage of module
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;

  try {
    var result = convert.xml2js(body, { compact: true, ignoreDeclaration: true, ignoreAttributes: true, ignoreCdata: true, ignoreDoctype: true });
    var getBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:SinglePaymentResponse']['ns2:WebPaymentResponse']['ns2:Redirect'];
    var jsonObj = {};

    jsonObj['RedirectUrl'] = getBody['ns2:RedirectUrl']['_text'];

    for (let i = 0; i < getBody['ns2:UrlParams'].length; i++) {
      jsonObj[getBody['ns2:UrlParams'][i]['ns2:key']['_text']] = getBody['ns2:UrlParams'][i]['ns2:value']['_text'];
    }

    return res.status(200).json(jsonObj);
  } catch (e) {
    return res.status(200).json(e.toString());
  }
})

app.use('/payhost-query', async (req, res, next) => {
  const { PAYGATE_ID, PASSWORD, reference, payRequestId, transId, checkedRef } = req.body;

  if(checkedRef === 'reference'){
    var id = `<ns1:TransactionId>${reference}</ns1:TransactionId>`;
  }else if(checkedRef === 'transid') {
    var id = `<ns1:MerchantOrderId>${transId}</ns1:MerchantOrderId>`;
  } else{
    var id = `<ns1:PayRequestId>${payRequestId}</ns1:PayRequestId>`;
  }
  var xml = `<?xml version="1.0" encoding="UTF-8"?>
  <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.paygate.co.za/PayHOST"><SOAP-ENV:Body><ns1:SingleFollowUpRequest>
    <ns1:QueryRequest>
      <ns1:Account>
        <ns1:PayGateId>${PAYGATE_ID}</ns1:PayGateId>
        <ns1:Password>${PASSWORD}</ns1:Password>
      </ns1:Account>
      ${id}
    </ns1:QueryRequest>
  </ns1:SingleFollowUpRequest>
  </SOAP-ENV:Body></SOAP-ENV:Envelope>`;

  // usage of module
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;

  return res.status(200).json(body);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start your app.
server.listen('4000', async err => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Server started!!');
  }
});
