const url = "http://192.168.191.5:5000";
import Fetch from "./utils/fetch.js";
import fetchPosts from "./utils/fetchPosts.js";
import search from "./utils/search.js";
/**Search Functionality */
search(url);
fetchPosts(url);

//create post
const postform = document.querySelector("#postform");
const infile = document.querySelector("#infile");
infile.addEventListener("change", imageUploaded);
var srcdata = "";
function imageUploaded() {
  var fileselect = document.querySelector("#infile").files;
  if (fileselect.length > 0) {
    fileselect = fileselect[0];
    var fd = new FileReader();
    fd.onload = (loadevent) => {
      srcdata = loadevent.target.result;
      document.querySelector(".imagefile").src = srcdata;

      //srcdata=srcdata.replace("data:", "")
      //.replace(/^.+,/, "");
      //console.log(srcdata);
    };
    fd.readAsDataURL(fileselect);
  }
}

postform.addEventListener("submit", (e) => {
  e.preventDefault();
  imageUploaded();

  // var user_name = document.querySelector(".user-section");
  // user_name.innerHTML = localStorage.getItem("name");
  var description_of_post = document.querySelector("#Description").value;

  var obj = {
    image: srcdata,
    msg: description_of_post,
  };
  //console.log(obj);

  const d = Fetch(url, "/post", obj);
  d.then((data) => {
    if (data["status"] == "Posted Successfully") {
      //alert(data['status']);
      document.querySelector(".imagefile").src = "./images/upload.webp";

      fetchPosts(url);
    }
  });
});
