import axios from 'axios';

const api = axios.create({
  baseURL: 'https://staging-dontwannalogin.fly.dev',
  headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
});

export async function findCakeInfo(cakeNumber) {
  try {
    const response = await api.get(
      `/annotations/cake-info-${cakeNumber}/find-by-alias-or-id`
    );

    if (response.status === 200) {
      const [name, price, imageUrl, description] =
        response.data.data.split('@@');

      const responseSplited = {
        name,
        price: Number(price),
        imageUrl,
        description,
        size: 0,
        format: '',
        quantity: 0,
        candy: false,
      };

      return responseSplited;
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteUser(user) {
  try {
    const response = await api.get('/annotations');

    if (response.status === 200) {
      const userOrders = response.data.filter((userOrder) =>
        userOrder.alias.includes(`user-order-${user.toLowerCase()}`)
      );

      if (!userOrders.length) {
        return 'Usuário deletado com sucesso';
      }

      await Promise.all(
        userOrders.map((userOrder) =>
          api.delete(`/annotations/${userOrder._id}`)
        )
      );

      return 'Usuário deletado com sucesso';
    }
  } catch (e) {
    console.log(e);
  }
}

export async function findUserOrders(user) {
  try {
    const response = await api.get('/annotations');

    if (response.status === 200) {
      const userOrders = response.data.filter((userOrderData) =>
        userOrderData.alias.includes(`user-order-${user.toLowerCase()}`)
      );

      if (!userOrders.length) {
        return null;
      }

      const userOrdersListMapped = userOrders.map((userOrders) => {
        const [orderNumber, orderTimestamp, orderPrice] =
          userOrders.data.split('@@');

        const [orderDate, orderTime] = orderTimestamp.split('T');

        const [year, month, day] = orderDate.split('-');

        const dateFormatted = `${day}/${month}/${year}`;

        const timeFormatted = orderTime.substring(0, 8);

        return {
          orderNumber,
          orderDate: dateFormatted,
          orderTime: timeFormatted,
          orderPrice: Number(orderPrice),
        };
      });

      return userOrdersListMapped;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function createUserOrder(user, orderPrice) {
  try {
    const { id, orderNumber } = await getUserOrderNumber();

    const orderTimestamp = new Date().toISOString();

    const dataString = `${orderNumber}@@${orderTimestamp}@@${orderPrice}`;

    const body = {
      alias: `user-order-${user.toLowerCase()}-${orderNumber}`,
      data: dataString,
    };

    const response = await api.post('/annotations', body);

    if (response.status === 201) {
      await api.patch(`/annotations/${id}`, { data: Number(orderNumber) + 1 });

      return 'Pedido feito com sucesso';
    }
  } catch (e) {
    console.log(e);
  }
}

async function getUserOrderNumber() {
  try {
    const orderNumberResponse = await api.get(
      `/annotations/user-orders-number/find-by-alias-or-id`
    );

    const orderNumber = orderNumberResponse.data.data;

    const orderNumberId = orderNumberResponse.data._id;

    return { id: orderNumberId, orderNumber: Number(orderNumber) };
  } catch (e) {
    console.log(e);
  }
}
