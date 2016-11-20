/**
 * Created by ArteVal on 20.11.2016.
 */
$(function () {
    var form = $('form');
    $(document).on('submit', function (e) {
        e.preventDefault();
        var formData = form.serializeArray(),
            url = form.attr('action'),
            method = form.attr('method');
        form.find('.has-feedback').removeClass('has-success has-error');
        form.find('.error-msg').addClass('hidden');
        form.find('.form-control-feedback').removeClass('glyphicon-ok glyphicon-remove').addClass('hidden');
        $.ajax({
            type: method,
            data: formData,
            url: url,
            success: function (data) {
                var resData = JSON.parse(data);
                if (resData.type == 'success') {
                    form.find('.has-feedback').addClass('has-success');
                    form.find('.form-control-feedback').addClass('glyphicon-ok').removeClass('hidden');
                    form.find('input').val('');
                    alert('данные успешно отправленны');
                } else {
                    var errorBody = resData.body;
                    errorBody.forEach(function (error, i, errorBody) {
                        var inputBlock = form.find('input[name="'+error.data+'"]').closest('.has-feedback').addClass('has-error');
                        inputBlock.children('.form-control-feedback').addClass('glyphicon-remove').removeClass('hidden');
                        inputBlock.children('.error-msg').removeClass('hidden').text(error.text);
                    });
                }
            },
            error: function (data) {
                alert('Ошибка отправки данных, попробуйте повторить отправку');
            }
        });
    })
})