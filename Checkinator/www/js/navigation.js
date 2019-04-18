//Your previous solution was a bunch of the same code copied over and over for one change in variable.
//This method is reusable and shorter.
//Takes in a page name, and hides the current page, then sets the new page


function navigate(pageName) {
    var currentPageName = localStorage.getItem('currentPage');
    if (currentPageName) {
        var currentPage = document.getElementById(currentPageName);
        currentPage.style.display = 'none';   
    }
    localStorage.setItem('currentPage', pageName)
    newPage = document.getElementById(pageName);
    newPage.style.display = 'block';
}