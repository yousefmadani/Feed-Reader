/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* All of the tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is the first test suite -This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.*/
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined and that the URL is not empty. */
        it('contains a URL and that it is not empty and has correct formatting', function() {

            var len = allFeeds.length; //define length so loop doesnt inquire everytime
            for (var i = 0; i < len; i++) {
                var allFeedsUrl = allFeeds[i].url;
                expect(allFeedsUrl).toBeDefined();
                expect(allFeedsUrl.length).not.toBe(0);
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined and that the name is not empty.*/
        it('has a defined name and that it is not empty', function() {
            var len = allFeeds.length;
            for (var i = 0; i < len; i++) {
                var allFeedsName = allFeeds[i].name;
                expect(allFeedsName).toBeDefined();
                expect(allFeedsName.length).not.toBe(0);
            }
        });
    });

    /* "The menu" test suite*/
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. */
        it('element is hidden by default', function() {
            // console.log(document.body); // check its elements
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test has two expectations: does the menu display when clicked and does it hide when clicked again. */

        it('changes visibility when the menu icon is clicked', function() {
            //---------- define variable to aviod repetition ----------
            var checkClassList = document.body.classList;

            //---------- Check if menu opens when clicked ----------
            $('.menu-icon-link').trigger('click');
            expect(checkClassList.contains('menu-hidden')).toBe(false);

            //---------- Check if menu closes when clicked ----------
            $('.menu-icon-link').trigger('click');
            expect(checkClassList.contains('menu-hidden')).toBe(true);
        });
    });


    /* "Initial Entries" test suite */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // ---------- By default jasmine will wait for 5 seconds for an asynchronous spec to finish before causing a timeout failure. ----------
        it('ensures that the loadFeed function is called and completes its work', function() {
            // ---------- we expect a single .entry element within the .feed container ----------

            // ---------- from the documentation: expect(value).toBeGreaterThan(0);----------
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/
        // ---------- assign two variables ----------
        var firstLoadFeed, secondLoadFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstLoadFeed = $('.feed').html();
                // console.log(firstLoadFeed); //check
                loadFeed(1, function() {
                    secondLoadFeed = $('.feed').html();
                    // console.log(secondLoadFeed); //check
                    done();
                });
            });
        });

        it('ensures when a new feed is loaded by loadFeed() and that the content changed', function() {
            expect(secondLoadFeed).not.toEqual(firstLoadFeed);
        });
    });
}());