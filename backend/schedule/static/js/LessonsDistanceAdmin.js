(function ($) {
    $(document).ready(function () {
        $("#id_subject").on("change", function (e) {
            if (e.target.selectedOptions[0]) {
                var id = e.target.value;
                var subject = e.target.selectedOptions[0].text;
                console.log(subject);
                console.log(id);
                
                $.ajax({
                    url: 'http://localhost:5000/lessons_distance/',
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data)
                    }
                })
            }
        });
    });
})(django.jQuery);