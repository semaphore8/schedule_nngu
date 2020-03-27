(function ($) {
    $(document).ready(function () {
        var classrooms_size = [];

        // handle speaker and classroom selects
        $("#id_subject").on("change", function (e) {
            if (e.target.selectedOptions[0]) {
                var subject_id = e.target.value;
                var subject = e.target.selectedOptions[0].text;
                
                // fetch data
                $.ajax({
                    url: 'http://localhost:5000/subjects/' + subject_id,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        $('#id_speaker').empty();
                        $('#id_classroom').empty();
                        classrooms_size = [];
                        let options_speaker = '';
                        let options_classroom = '';
                        options_speaker += `
                                <option value="">------------</option>
                            `;
                        options_classroom += `
                                <option value="">------------</option>
                            `;
                        data.speaker_list.forEach(speaker => {
                            options_speaker += `
                                <option value="${speaker.id}">${speaker.name}</option>
                            `;
                        });
                        data.classrooms_list.forEach(classroom => {
                            classrooms_size.push({'id': classroom.id, 'size': classroom.size});
                            options_classroom += `
                            <option value="${classroom.id}">${classroom.name}</option>
                            `;
                        });
                        //refresh speaker data on page
                        $('#id_speaker').append(options_speaker);
                        $('#id_speaker').prop("disabled", false);

                        //refresh classroom data on page
                        $('#id_classroom').append(options_classroom);
                        $('#id_classroom').prop("disabled", false);
                    }
                })
            }
        });

        // check if students fit into the classroom
        var fit_results = '';

        var group
        var group_size
        var group_selected = false;

        $('#id_study_group').on("change", function (e) {
            if (e.target.selectedIndex !== 0) {
                var group_id = e.target.value;
                group = e.target.selectedOptions[0].text;
                group_size
                group_selected = true;
                
                $.ajax({
                    url: 'http://localhost:5000/groups/' + group_id,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        group_size = data.students_count;
                        alertCheckResults();
                    }
                })
            } else group_selected = false;
        })

        var classroom
        var classroom_size
        var classroom_selected = false;

        $('#id_classroom').on("change", function (e) {
            if (e.target.selectedIndex !== 0) {
                var classroom_id = e.target.value;
                classroom = e.target.selectedOptions[0].text;
                classroom_size = classrooms_size.filter(classroom => classroom.id == classroom_id)[0].size;
                
                classroom_selected = true;
                alertCheckResults();
            } else classroom_selected = false; 
        })

        function alertCheckResults() {
            if (group_selected & classroom_selected) classroom_size < group_size ? fit_results = `<span style="color: darkred;">Число студентов в группе ${group} больше, чем размер аудитории ${classroom} (${group_size} > ${classroom_size}).</span>` : fit_results = `<span style="color: darkgreen;">Группа ${group} помещается в аудиторию ${classroom} (${group_size} <= ${classroom_size}).</span>`;
            $('#fit_results').empty();
            $('#fit_results').append(fit_results);
        } 

    });
})(django.jQuery);