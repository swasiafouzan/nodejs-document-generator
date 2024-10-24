const express = require("express");
const fs = require("fs");
const PdfDocument = require("pdfkit");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/generate-document", (req, res) => {
  //get data from the request body
  const { title, content } = req.body;

  //create a new pdf document
  const doc = new PdfDocument();

  //set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);

  //pipe the pdf to response
  doc.pipe(res);

  //Add content to the pdf
  doc.fontSize(18).text(title, { align: "center" });
  doc.fontSize(12).text(content, { align: "center" });

  //finalize the pdf and end the response
  doc.end();
});

app.listen(port, () => {
  console.log(`Server is running on localhost ${port}`);
});
