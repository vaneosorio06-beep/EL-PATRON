import test from 'node:test';
import assert from 'node:assert/strict';
import {promptFor,moveItem,durationTotal,escapeHTML} from '../core.js';
test('Real-person brief includes preservation and campaign requirements',()=>{const text=promptFor({name:'Cena',event:'Aniversario',date:'2026-10-10',objective:'Reservas'},{name:'Selva',description:'Luz cálida'},'real','Sin filtros');assert.match(text,/preservar identidad/);assert.match(text,/No modificar intencionadamente rostros ni cuerpos/);assert.match(text,/Reservas/);assert.match(text,/Sin filtros/)});
test('Virtual brief uses fictitious adults and disclosure',()=>{const text=promptFor({name:'Cena',objective:'Visitas'},{name:'Selva',description:'Natural'},'virtual','');assert.match(text,/adultas ficticias/);assert.match(text,/Identificar la pieza/)});
test('Reorder preserves slides and guards boundaries',()=>{const items=[{id:'a'},{id:'b'},{id:'c'}];assert.deepEqual(moveItem(items,1,-1).map(x=>x.id),['b','a','c']);assert.deepEqual(items.map(x=>x.id),['a','b','c']);assert.deepEqual(moveItem(items,0,-1),items)});
test('Storyboard sums durations and user text is escaped',()=>{assert.equal(durationTotal([{duration:4},{duration:6}]),10);assert.equal(escapeHTML('<img onerror="x">'), '&lt;img onerror=&quot;x&quot;&gt;')});
