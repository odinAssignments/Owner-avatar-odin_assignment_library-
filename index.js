window.onload = function () {
  console.log("document loaded");

  const library = [];
  function Book(author, title, pages, image = null) {
    this.id = Date.now();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.image =
      image || "https://upload.wikimedia.org/wikipedia/commons/3/39/Book.svg";
  }

  function isNotEmptyString(str) {
    return str.trim() !== "";
  }

  function addNewBook(book) {
    if (Array.isArray(book)) {
      library.push(...book);
    } else {
      library.push(book);
    }
  }

  function injectBooksData() {
    const list = document.querySelector(".list");
    list.innerHTML = "";

    for (const [k, v] of library.entries()) {
      const item = document.createElement("li");
      const img = document.createElement("img");
      const menu = document.createElement("ul");
      const bookTitle = document.createElement("p");
      const bookAuthor = document.createElement("p");

      img.classList.add("image");
      img.src = v.image;
      img.id = k;

      bookTitle.textContent = v.title;
      bookTitle.classList.add("title_book");

      bookAuthor.textContent = v.author;
      bookAuthor.classList.add("author_book");

      list.style.justifyContent = "flex-start";

      item.appendChild(img);
      item.appendChild(bookTitle);
      item.appendChild(bookAuthor);
      list.appendChild(item);
      item.appendChild(menu);

      const rect = img.getBoundingClientRect();

      menu.style.position = "absolute";
      menu.style.width = `${rect.width}px`;
      menu.style.height = `0px`;
      menu.style.top = `${rect.top}px`;
      menu.style.left = `${rect.left}px`;
      menu.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      menu.style.transition = "height 0.3s ease-in-out";
      menu.style.display = "flex";
      menu.style.flexDirection = "column";
      menu.style.justifyContent = "center";
      menu.style.alignItems = "center";

      const pages = document.createElement("p");
      pages.textContent = `Total Pages ${v.pages}`;
      pages.style.display = "none";
      pages.style.color = "white";
      pages.style.textAlign = "center";

      if (v.id) {
        const delete_book = document.createElement("button");
        delete_book.classList.add("btn_delete");
        delete_book.style.display = "none";
        delete_book.value = "Delete";
        delete_book.id = v.id;
        menu.appendChild(delete_book);
      }

      menu.appendChild(pages);
    }
  }

  function injectBooksDataByFilter(search) {
    const list = document.querySelector(".list");

    list.innerHTML = "";

    for (const [k, v] of library.entries()) {
      const matchTitle = v.title.toLowerCase().includes(search.toLowerCase());
      const matchAuthor = v.author.toLowerCase().includes(search.toLowerCase());

      if (matchTitle || matchAuthor) {
        const item = document.createElement("li");
        const menu = document.createElement("ul");
        const img = document.createElement("img");
        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");

        img.classList.add("image");
        img.src = v.image;
        img.id = k;

        bookTitle.textContent = v.title;
        bookTitle.classList.add("title_book");

        bookAuthor.textContent = v.author;
        bookAuthor.classList.add("author_book");

        list.style.justifyContent = "center";

        item.appendChild(img);
        item.appendChild(bookTitle);
        item.appendChild(bookAuthor);
        list.appendChild(item);
        item.appendChild(menu);

        const rect = img.getBoundingClientRect();

        menu.style.position = "absolute";
        menu.style.width = `${rect.width}px`;
        menu.style.height = `0px`;
        menu.style.top = `${rect.top}px`;
        menu.style.left = `${rect.left}px`;
        menu.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        menu.style.transition = "height 0.3s ease-in-out";
        menu.style.display = "flex";
        menu.style.flexDirection = "column";
        menu.style.justifyContent = "center";
        menu.style.alignItems = "center";

        // menu.style.cursor = "pointer";

        const pages = document.createElement("p");
        pages.textContent = `Total Pages ${v.pages}`;
        pages.style.display = "none";
        pages.style.color = "white";
        pages.style.textAlign = "center";

        if (v.id) {
          const delete_book = document.createElement("button");
          delete_book.classList.add("btn_delete");
          delete_book.style.display = "none";
          delete_book.value = "Delete";
          delete_book.id = v.id;
          menu.appendChild(delete_book);
        }

        menu.appendChild(pages);
        item.addEventListener("mouseover", () => {
          menu.style.height = `${rect.height}px`;
          pages.style.display = "block";
        });

        item.addEventListener("mouseleave", () => {
          menu.style.height = `0px`;
          pages.style.display = "none";
        });
      }
    }
    addMenuEventTransition();
  }

  function addMenuEventTransition() {
    const items = document.querySelectorAll(".list li");

    items.forEach((item) => {
      const img = item.querySelector(".image");
      const menu = item.querySelector("ul");
      const rect = img.getBoundingClientRect();
      const delete_btn = item.querySelector(".btn_delete");

      menu.style.position = "absolute";
      menu.style.width = `${rect.width}px`;
      menu.style.height = `0px`;
      menu.style.top = `${rect.top}px`;
      menu.style.left = `${rect.left}px`;
      menu.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      menu.style.transition = "height 0.3s ease-in-out";
      menu.style.display = "flex";
      menu.style.flexDirection = "column";
      menu.style.justifyContent = "center";
      menu.style.alignItems = "center";

      if (delete_btn) {
        delete_btn.style.display = "none";
        delete_btn.textContent = "Delete";
      }

      item.addEventListener("mouseover", () => {
        menu.style.height = `${rect.height}px`;
        menu.querySelector("p").style.display = "block";
        if (delete_btn) {
          delete_btn.style.display = "block";
        }
      });

      item.addEventListener("mouseleave", () => {
        menu.style.height = `0px`;
        menu.querySelector("p").style.display = "none";
        if (delete_btn) {
          delete_btn.style.display = "none";
        }
      });

      if (delete_btn) {
        delete_btn.addEventListener("click", () => {
          removeBook(delete_btn.id);
        });
      }
    });
  }

  function removeBook(id) {
    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

    const filteredBooks = existingBooks.filter((book) => book.id != id);

    localStorage.setItem("books", JSON.stringify(filteredBooks));

    location.reload();
  }

  // On DOM loaded we inject the library data from data/books.json.
  fetch("./data/books.json")
    .then((response) => response.json())
    .then((data) => {
      addNewBook(data);
      injectBooksData();
      setTimeout(addMenuEventTransition, 100);
    });

  const booksData = localStorage.getItem("books");
  if (booksData) {
    addNewBook(JSON.parse(booksData));
    injectBooksData();
    setTimeout(addMenuEventTransition, 100);
  }

  // Inject books to the list container (UL/LI):
  function showAllBooks() {
    if (library.length <= 0) {
      return;
    }
    injectBooksData();
    addMenuEventTransition();
  }

  const dialog = document.querySelector("dialog");
  const showButton = document.querySelector(".btn_showdialog");
  const closeButton = document.querySelector("dialog > button");
  const btn_search = document.querySelector(".btn_search");

  const onSubmit = document.getElementById("submit");
  const search = document.getElementById("search");
  search.value = "";

  // Hook the event when we resize the webpage to avoid bad anchor :
  window.addEventListener("resize", () => addMenuEventTransition());

  // Clear the input if it's empty :
  search.addEventListener("keydown", (e) => {
    const btn_clear = document.querySelector(".btn_clear");

    const key = e.keyCode || e.charCode;
    if (key == 13) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (btn_clear != null && !isNotEmptyString(search.value)) {
      injectBooksData();
      addMenuEventTransition();
      btn_clear.remove();
    }
  });

  // Btn Search Input :
  btn_search.addEventListener("click", (e) => {
    const search_form = document.querySelector(".search_form");
    let btn_clear = document.querySelector(".btn_clear");

    if (btn_clear == null) {
      if (!isNotEmptyString(search.value)) {
        return (search.value = "");
      }
      btn_clear = document.querySelector(".btn_clear");
      const div = document.createElement("div");
      div.textContent = "X";
      div.classList.add("btn_clear");

      search_form.append(div);

      // Filter here the books :
      injectBooksDataByFilter(search.value);

      // On btn clear clicked we clear the search input value :
      div.addEventListener("click", () => {
        search.value = " ";
        div.remove();
        injectBooksData();
        addMenuEventTransition();
      });
    }
  });

  // Book Form :
  onSubmit.addEventListener("submit", (e) => {
    // avoid sending event to not refresh the page :
    e.preventDefault();

    const input_author = document.getElementById("author");
    const input_title = document.getElementById("title");
    const input_pages = document.getElementById("pages");
    const input_image = document.getElementById("image");

    // for the sake of better readability :
    const { value: author } = input_author;
    const { value: title } = input_title;
    const { value: pages } = input_pages;
    const { value: image } = input_image;

    const isValidImg = /\.(jpe?g|png)$/i;
    // making sure that we don't send empty data :
    const doesInputAreNotValid =
      !isNotEmptyString(author) || !isNotEmptyString(title) || pages <= 0;

    if (doesInputAreNotValid) {
      return alert(
        "Please Fill all the fields to be able to submit a new book."
      );
    }

    // Making sure the image link is valid.
    if (image.length >= 1 && !isValidImg.test(image)) {
      return alert("Please set a valid image link or let it empty.");
    }

    // create new book :
    const newBook = new Book(author, title, pages, image);
    addNewBook(newBook);

    // Show all the books from library :
    showAllBooks();

    // clear the fields :
    input_author.value = "";
    input_title.value = "";
    input_pages.value = 0;
    input_image.value = "";

    dialog.close();
    let existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    existingBooks.push(newBook);
    localStorage.setItem("books", JSON.stringify(existingBooks));
    location.reload();
  });

  showButton.addEventListener("click", () => dialog.showModal());
  closeButton.addEventListener("click", () => dialog.close());
};
