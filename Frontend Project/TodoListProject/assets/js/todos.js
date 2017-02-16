// Check-off specific todos by Clicking
$("li").click (function() {
    // if li is gray, turn it black else turn it gray
    $(this).toggleClass('completed');
});

// Click on X to delete Tooo
$("span").click(function(event) {
    $(this).parent().fadeOut('500', function() {
        $(this).remove();
    });
    event.stopPropagation();
});