const mess_md = require('../models/message.model');

module.exports.getDashboard = (req, res) => {
    res.render('dashboard', {data: {}});
}

module.exports.postDashboard = async (req, res) => {
    let data = req.body;
    let errors = [];
    let listHotWords = ['lồn', 'buồi', 'cặc', 'vú', 'đm', 'dm', 'địt', 'đụ', 'chịch', 'xoạc'];

    if(!data.question){
        errors.push('Chưa nhập câu hỏi.');
    }
    if(!data.answer){
        errors.push('Chưa nhập câu trả lời');
    }

    if(errors.length){
        res.render('dashboard', {data: {error : errors}});
        return;
    }

    let check1 = listHotWords.find((word) => data.question.toLowerCase().indexOf(word) !== -1);
    let check2 = listHotWords.find((word) => data.answer.toLowerCase().indexOf(word) !== -1);

    if(check1 || check2) {
        res.render('dashboard', {data: {error: 'Không được dạy hư chú mèo ngây thơ này nha!'}});
        return;
    }

    let newMessage = new mess_md({
        question: data.question,
        answer: data.answer
    });

    await newMessage.save();

    res.render('dashboard', {data: {success: 'Thêm thành công!'}});
}