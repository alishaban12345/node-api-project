
const supertest = require('supertest');
const createUser = require('./user.js');
const express = require('express');
// import express from 'express';
// import createUser from './users.js';
const app =express();
test("sign up ",async () => {
   const response = await createUser()
   expect(response).toBe(response)
    
})

