const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
 
var User = require('../models/user.model');
 
describe('Testing Login model', () => {
    // this.timeout=2==;
    let sampleUserVal;
    beforeEach(() => {
      sampleUserVal = {
        email: 'sampleEmail@gmail.com',
        password : '@#@$$DL:SFS;ldfdsfgds;l)!#)(#9$#%',
        name:"prem"
      };
    });
    it('it should throw an error due to missing fields', async () => {
        let user = new User();
        try {
          await user.validate();
          // Validation succeeded, which is unexpected
          // Fail the test as there should have been validation errors
          throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
          // console.log(err)
          // Validation failed, as expected
          expect(err.errors.email).to.exist;
          expect(err.errors.password).to.exist;
          expect(err.errors.password).to.exist;
        }
      });
 
      it('it should create the item successfully with correct parameters',(done) => {
        let user = new User(sampleUserVal);
        user.validate().then(()=>{done();}).catch((err)=>{throw new Error('⚠️ Unexpected failure!')})
      });
    
  }) 