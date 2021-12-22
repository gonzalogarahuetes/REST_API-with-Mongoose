const db = require("../");
const server = require("../../utils/tests/server");

describe("mongoose relations", () => {
  let BOOK = null;
  let CORRECT_BOOK_INFO = null;

  beforeAll(async () => {
    await server.initTestServer();

    BOOK = await db.Author.create({
      name: "alex",
      lastName: "alex",
      email: "alex@mail.com",
      country: "Alexland",
      spokenLanguages: ["English", "Spanish"],
    });

    CORRECT_BOOK_INFO = {
      title: "hello world",
      category: "Rock",
      pages: 192,
      author: BOOK._id,
    };
  });

  afterEach(async () => await server.clearSongsCollection());

  afterAll(async () => {
    await server.clearUsersCollection();
    await server.stopTestServer();
  });

  test("1.1.1 the title of the book is required", async () => {
    expect.assertions(1);

    try {
      const { title, ...props } = CORRECT_BOOK_INFO;

      await db.Book.create(props);
    } catch (error) {
      expect(error.errors.title.message).toMatch(/is required/);
    }
  });

  test("1.1.3 trims the name of the book", async () => {
    const book = await db.Book.create({
      ...CORRECT_BOOK_INFO,
      title: "  name   ",
    });
    expect(book.title).toBe("name");
  });

  test("1.2.1 the category of the book is required", async () => {
    expect.assertions(1);

    try {
      const { category, ...props } = CORRECT_BOOK_INFO;

      await db.Book.create(props);
    } catch (error) {
      expect(error.errors.category.message).toMatch(/is required/);
    }
  });

  test("1.2.3 trims the category of the book", async () => {
    const book = await db.Book.create({
      ...CORRECT_BOOK_INFO,
      category: "  rock   ",
    });
    expect(book.category).toBe("rock");
  });

  test("1.3.1 the book pages is required", async () => {
    expect.assertions(1);

    try {
      const { pages, ...props } = CORRECT_BOOK_INFO;

      await db.Book.create(props);
    } catch (error) {
      expect(error.errors.pages.message).toMatch(/is required/i);
    }
  });

  test("1.3.2 the pages of the book is a number", async () => {
    expect.assertions(1);

    try {
      const { pages, ...props } = CORRECT_BOOK_INFO;

      await db.Book.create({ ...props, pages: "hello" });
    } catch (error) {
      expect(error.errors.pages.message).toMatch(/cast to number/i);
    }
  });

  test("1.4 the stats of the book have the default values", async () => {
    const book = await db.Book.create(CORRECT_BOOK_INFO);
    expect(book.stats).toEqual({
      timesPlayed: 0,
      upVotes: 0,
      downVotes: 0,
    });
  });

  test("1.4 the stats of the book set values and defaults", async () => {
    const expected = {
      timesPlayed: 0,
      upVotes: 0,
      downVotes: 10,
    };

    const book = await db.Book.create({
      ...CORRECT_BOOK_INFO,
      stats: expected,
    });

    expect(book.stats).toEqual(expected);
  });

  test("1.5.1 the authors of the book are required", async () => {
    expect.assertions(1);

    try {
      const { author, ...props } = CORRECT_BOOK_INFO;

      await db.Song.create(props);
    } catch (error) {
      expect(error.errors.author.message).toMatch(/is required/i);
    }
  });

  test("1.5.2 the book has an author", async () => {
    const book = await db.Book.create(CORRECT_BOOK_INFO);
    expect(book.author).toEqual(expect.anything());
  });

  test("1.5.2 the book has a ref to the author collection", async () => {
    let book = await db.Book.create(CORRECT_BOOK_INFO);
    song = await book.execPopulate("author");

    expect(book.author._id).toEqual(expect.anything());
    expect(book.author.firstName).toEqual(expect.any(String));
    expect(book.author.lastName).toEqual(expect.any(String));
  });

  test("1.6 the books doc includes the timestamps", async () => {
    const book = await db.Book.create(CORRECT_BOOK_INFO);

    expect(book.createdAt).toEqual(expect.any(Date));
    expect(book.updatedAt).toEqual(expect.any(Date));
  });
});
