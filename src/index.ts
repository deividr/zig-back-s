import express, { json } from "express";

const app = express();

type Book = {
  id?: string;
  title: string;
  author: string;
  pages: number;
  value: number;
};

const books: Book[] = [];

app.use(json());

app.get("/", (_, res) => {
  res.send(books);
});

app.post("/create-book", async (req, res) => {
  books.push({ id: Math.floor(Math.random()), ...req.body });
  res.send("ok");
});

app.get("/get-book/:id", async (req, res) => {
  const result = books.find((item) => item.id == req.params.id);
  res.send(result);
});

app.get("/get-books", async (req, res) => {
  const result = books.filter((item) =>
    item.title.includes(req.query.name as string),
  );
  res.send(result);
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
