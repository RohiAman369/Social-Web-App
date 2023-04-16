const queue = require('../config/kue');
const resetPassMailer = require('../mailers/reset_password');
queue.process('resetEmails',function(job,done){
    console.log('Reset Emails. is processing a job',job.data);
    resetPassMailer.resetPassword(job.data);
    done();
})