const TypeCheck = class {
  constructor(value, where) {
    this.value = value;
    this.where = where;
  }

  isPassword(min = 8, max = 30) {
    if (!this.value) return { where: "password", error: "missing" };

    if (typeof this.value !== "string")
      return { where: "password", error: "type" };

    if (this.value.length < min || this.value.length > max)
      return { where: "password", error: "length" };

    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$ %^&*-]).*$/.test(
        this.value
      )
    )
      return { where: "password", error: "format" };
  }

  isUsername() {
    if (!this.value) return { where: "username", error: "missing" };

    if (typeof this.value !== "string")
      return { where: "username", error: "type" };

    if (this.value.length < 4 || this.value.length > 30)
      return { where: "username", error: "length" };

    if (this.value.includes("@"))
      return { where: "username", error: "@symbol" };
  }

  isEmail() {
    if (!this.value) return { where: "email", error: "missing" };

    if (typeof this.value !== "string")
      return { where: "email", error: "type" };

    if (this.value.includes("@byom.de"))
      return { where: "email", error: "fake" };

    if (
      !/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(
        this.value
      )
    )
      return { where: "email", error: "format" };
  }

  isName(where = "name") {
    if (!this.value) return { where, error: "missing" };

    if (typeof this.value !== "string") return { where, error: "type" };

    if (this.value.length < 2 || this.value.length > 50)
      return { where, error: "length" };

    if (!/^[a-z-]*$/i.test(this.value)) return { where, error: "format" };
  }

  isPrice() {
    if (!this.value) return { where: this.where || "price", error: "missing" };

    if (typeof this.value !== "number")
      return { where: this.where || "price", error: "type" };

    if (this.value < 0)
      return { where: this.where || "price", error: "negative" };
  }

  isLink(needed = false) {
    if (!this.value && needed)
      return { where: this.where || "link", error: "missing" };
    else if (!this.value && !needed) return null;

    if (typeof this.value !== "string")
      return { where: this.where || "link", error: "type" };

    if (
      !/http(s)?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
        this.value
      )
    )
      return { where: this.where || "link", error: "format" };

    if (!this.value.startsWith("https://"))
      return { where: this.where || "link", error: "insecure" };

    return null;
  }

  isTitle() {
    if (!this.value || this.value.length === 0)
      return { where: this.where, error: "missing" };

    if (typeof this.value !== "string")
      return { where: this.where, error: "type" };

    if (this.value.length > 150) return { where: this.where, error: "length" };

    return null;
  }

  isDescription() {
    if (!this.value || this.value.length === 0)
      return { where: this.where, error: "missing" };

    if (typeof this.value !== "string")
      return { where: this.where, error: "type" };

    if (this.value.length > 1000) return { where: this.where, error: "length" };

    return null;
  }

  isLocation(area = false) {
    if (!this.value) return { where: this.where, error: "missing" };

    if (!area) {
      if (
        typeof this.value !== "object" ||
        !this.value.lat ||
        !this.value.lng ||
        typeof this.value.lat !== "number" ||
        typeof this.value.lng !== "number" ||
        !this.value.place_id ||
        typeof this.value.place_id !== "number"
      )
        return { where: this.where, error: "type" };
    } else {
      if (
        typeof this.value !== "object" ||
        !this.value.lat ||
        !this.value.lng ||
        typeof this.value.lat !== "number" ||
        typeof this.value.lng !== "number" ||
        !this.value.place_id ||
        typeof this.value.place_id !== "number"
      )
        return { where: this.where, error: "type" };
    }

    return null;
  }
};

module.exports = TypeCheck;
