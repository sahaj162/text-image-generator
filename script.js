const accessKey = "JcJL9jiz0Nt3e_6Xw14zzwIq4o7f9GUxjDFbLc-kzzk"; // Add your actual access key here
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let totalPages = 1; // Track total pages

async function searchImages() {
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&client_id=${accessKey}`;
    try {
        // Fetch response
        const response = await fetch(url);
        const data = await response.json();

        // Check if there are results
        if (data.results.length === 0) {
            searchResult.innerHTML = '<p>No images found.</p>';
            searchMoreBtn.style.display = 'none'; // Hide button if no results
            return;
        }

        // Process and display results
        const results = data.results;
        results.forEach((result) => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const image = document.createElement("img");
            image.src = result.urls.small; // Use small size for display
            image.alt = result.alt_description;

            const downloadIcon = document.createElement("a");
            downloadIcon.href = result.urls.small; // Use small size for downloading
            downloadIcon.download = ""; // This makes it downloadable
            downloadIcon.classList.add("download-icon");
            downloadIcon.innerHTML = "<i class='fas fa-download'></i>"; // Font Awesome download icon

            imageContainer.appendChild(image);
            imageContainer.appendChild(downloadIcon);
            searchResult.appendChild(imageContainer);
        });

        // Update total pages based on response
        totalPages = Math.ceil(data.total / 10); // Assuming 10 images per page
        searchMoreBtn.style.display = page < totalPages ? 'block' : 'none'; // Show button if more pages are available

    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to first page on new search
    searchResult.innerHTML = ''; // Clear previous results
    searchImages();
});

// Event listener for 'Show More' button
searchMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
