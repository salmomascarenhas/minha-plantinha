import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Crie sua Conta' });
});

router.get('/saibaMais', (req, res) => {
  res.render('saibaMais', { title: 'Saiba mais' });
});
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: { name: 'Carregando...' } });
});

export default router;
