<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$answer = array (
    'type' => 'success',
    'body' => array ()
);

if (strlen ($name) < 6  || strlen ($name) > 12) {
    $answer['type'] = 'error';
    $answer['body'][] = array(
        'data' => 'name',
        'text' => 'Некорректная длина имени'
    );
};
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $answer['type'] = 'error';
    $answer['body'][] = array(
        'data' => 'email',
        'text' => 'Некорректный e-mail'
    );
};
if(!preg_match("/[3][8][0] (\([0-9]{2})\)([0-9]{3})-([0-9]{2})-([0-9]{2})/",$phone)){
    $answer['type'] = 'error';
    $answer['body'][] = array(
        'data' => 'phone',
        'text' => 'Введенный мобильный телефон не соответствует шаблону: 380 (ХХ)ХХХ-ХХ-ХХ'
    );
}
echo json_encode($answer);