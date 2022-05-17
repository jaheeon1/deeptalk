import jwt from 'jsonwebtoken'
import Student from "@/models/Student"
import "@/models/dbConnect"
import dotenv from 'dotenv'
import applyDotenv from '@/modules/lambdas/applyDotenv.js'

export default async (req, res) => {
	const { method } = req;
    const {jwtSecret} = applyDotenv(dotenv)
	switch (method) {
		case "POST":
            Student.findOne({
                studentid: req.body.studentid
            }, function (err, student) {
                if (err) 
                    throw err
                if (!student) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    const isMatch = student.password == req.body.password;
                    if (!isMatch) {
                        return res
                            .status(401)
                            .send({message: 'FAIL'});
                    } else {

                        var token = jwt.sign(student._id.toHexString(), jwtSecret)

                        student.token = token;
                        student.save(function (err, student) {
                            if (err) {
                            return res
                            .status(400)
                            .json(err);
                        } else {

                            return res
                                .status(200)
                                .json(student);
                           
                        }
                    })
                    }
                    console.log(' ### 로그인 정보 : ' + JSON.stringify(student))
                }
            })
	}
};