import Notification from '../schemas/Notifications';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'somente providers podem acessar as notificacões' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'somente providers podem acessar as notificacões' });
    }

    const notifications = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notifications);
  }
}

export default new NotificationController();
