import { JSDOM } from 'jsdom';
import { Component } from '@angular/core';

console.log('jsdom:', typeof JSDOM);
console.log('Angular Component:', typeof Component);
console.log('ESM resolution OK');
