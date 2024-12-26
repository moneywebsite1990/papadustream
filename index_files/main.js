jQuery(function($) {
    $(document).ready(function() {
        $('.MenuBtn').click(function(e) {
            e.preventDefault();
            $('#aa-wp').toggleClass('on');
        });
        $('.MenuBtnClose').click(function(e) {
            e.preventDefault();
            $('#aa-wp').removeClass('on');
        })
        $('#searchform_home, #searchform').on('submit', function(e) {
            e.preventDefault();
            // Get the search input value
            let query = $('#keysss_home').val().trim();

            // Encode the query to replace spaces with %20
            let encodedQuery = encodeURIComponent(query);

            window.location.href = "https://gomoviestv.vip/search/" + encodedQuery;
        })

        // API endpoint
        let apiUrl = `https://gomoviestv.vip/api/top-viewed`;

        // Send AJAX GET request to the API
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Handle the API response and display results

                if (response.top_movies && response.top_movies.length > 0) {
                    let resultsHtml = '';
                    response.top_movies.forEach(function(movie) {
                        resultsHtml += `
                                    <li>
                                        ${movie.title}
                                    </li>
                                `;
                    });
                    $('#top-movies').html(resultsHtml);
                }

                if (response.top_tv_shows && response.top_tv_shows.length > 0) {
                    let resultsHtml = '';
                    response.top_tv_shows.forEach(function(movie) {
                        resultsHtml += `
                                    <li>
                                        ${movie.title}
                                    </li>
                                `;
                    });
                    $('#top-tv').html(resultsHtml);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching search results:', error);
                $('#search-results').html('<p>Something went wrong. Please try again later.</p>');
            }
        });
    });
});