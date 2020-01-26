import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'erro de validação' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'usuário existente ' });
    }
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassord: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassord', (oldPassord, field) =>
          oldPassord ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'erro de validação' });
    }

    const { email, oldPassord } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'usuário inválido ' });
      }
    }

    if (oldPassord && !(await user.checkPassWord(oldPassord))) {
      return res.status(401).json({ error: 'senha anterior inválida' });
    }

    const [, [{ name, provider }]] = await User.update(req.body, {
      returning: true,
      where: { id: req.userId },
    });

    return res.json({ name, email, provider });
  }
}

export default new UserController();
