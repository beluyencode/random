const random = document.getElementById("random")
const nameUser = document.getElementById("name")
const timeInput = document.getElementById("time");
const popup = document.getElementById("popup");
const close = document.getElementById("close");
const open = document.getElementById("open");
const title = document.getElementById("title");
const click = document.getElementById("click");
var data = null
var time = 5000;
var user = null;

timeInput.value = time / 1000

timeInput.addEventListener("change", (e) => {
    time = +e.target.value * 1000;
})

open.addEventListener("click", (e) => {
    open.style.display = "none"
    popup.style.display = "flex"
})

close.addEventListener("click", (e) => {
    popup.style.display = "none"
    open.style.display = "block"
})

fetch("http://150.95.112.76:8880/api/customer/randomed").then((res) => res.json()).then((res) => {
    console.log(res);
    if (res.status === "success") {
        data = res?.data;
    }
})

click.addEventListener("click", () => {
    if (data) {
        nameUser.style.visibility = "hidden"
        title.style.visibility = "visible"
        random.style.visibility = "visible"
        var lucky = data[Math.floor(Math.random() * data.length)];
        fetch("http://150.95.112.76:8880/api/customer/" + lucky).then((res) => res.json()).then((res) => {
            console.log(res);
            if (res.status === "success") {
                user = res.data;
                fetch("http://150.95.112.76:8880/api/customer/" + user.id, { method: "PUT", body: JSON.stringify(user) });
            }
        })
        let interval = setInterval(() => {
            var randomIndex = Math.floor(Math.random() * data.length); // Lấy một chỉ mục ngẫu nhiên trong mảng
            var randomNumber = data[randomIndex];
            var string = 4 - ("" + data[randomIndex]).length
            var zero = ""
            for (let index = 0; index < string; index++) {
                zero += "0"
            }
            random.innerText = zero + randomNumber
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
            var string = 4 - ("" + lucky).length
            var zero = ""
            for (let index = 0; index < string; index++) {
                zero += "0"
            }
            random.innerText = zero + lucky;
            nameUser.innerText = (user.customer_id === "female" ? "Bà " : "Ông ") + user.fullname.toUpperCase();
            nameUser.style.visibility = "visible"
        }, time)
    }
})

