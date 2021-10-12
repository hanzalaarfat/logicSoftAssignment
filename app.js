const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/book-search", async (req, res) => {
  const isbn = req.query.isbn;
  try {
    let result = await axios.get(
      `https://lspl-info4you.glitch.me/search?isbn=${isbn}`
    );
    // console.log(result.data.Success);
    const ID = result.data.ID;
    if (result.data.Success) {
      let result = await axios.get(
        `https://lspl-info4you.glitch.me/info/${ID}`
      );
      if (result.data) {
        res.status(200).json({
          Success: true,
          data: result.data,
          message: "Successfully get data",
        });
      }
      res.status(200).json({
        Success: false,
        null: null,
      });
    } else {
      res.status(200).json({
        Query: "isbn={ISBN}",
        Success: false,
        ID: null,
      });
    }
  } catch (err) {
    res.status(200).json({
      Query: `isbn=${isbn}`,
      Success: false,
      ID: null,
    });
  }

  res.send(" Mongage user Api");
});

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.listen(3000, () => {
  console.log(`sarver started at port 3000 `);
});
