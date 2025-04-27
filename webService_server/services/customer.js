const db = require('./db');


async function addCustomer(customerData) {
  let { username, password, firstName, lastName, email, dob, gender, phone, points } = customerData;

  if (typeof dob === 'string') {
    const mdyMatch = dob.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (mdyMatch) {
      const [, m, d, y] = mdyMatch;
      dob = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    } else {
      throw new Error(`Invalid date format for dob: ${dob}`);
    }
  }

  console.log('addCustomer payload (normalized):', { username, password, firstName, lastName, email, dob, gender, phone, points });
  if ([username, password, firstName, lastName, email, dob, gender, phone, points].some(v => v === undefined)) {
    throw new Error('addCustomer error: one of the required fields is undefined');
  }

  const sql = `
    INSERT INTO customer (
      username,
      password,
      first_name,
      last_name,
      email,
      dob,
      gender,
      phone_number,
      points
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [username, password, firstName, lastName, email, dob, gender, phone, points];
  console.log('Executing SQL:', sql.trim(), params);

  try {
    const result = await db.query(sql, params);
    const insertId = result.insertId !== undefined ? result.insertId : (Array.isArray(result) && result[0]?.insertId) || null;
    return {
      customerID: insertId,
      username,
      firstName,
      lastName,
      email,
      dob,
      gender,
      phone,
      points
    };
  } catch (err) {
    console.error('addCustomer failed:', err.sqlMessage || err.message);
    throw new Error(`addCustomer error: ${err.sqlMessage || err.message}`);
  }
}

async function deleteCustomer(customerID) {
  const sql = `DELETE FROM customer WHERE customer_id = ?`;
  console.log('Executing SQL:', sql, [customerID]);
  try {
    const result = await db.query(sql, [customerID]);
    const affectedRows = result.affectedRows !== undefined ? result.affectedRows : (Array.isArray(result) && result[0]?.affectedRows) || 0;
    return { affectedRows };
  } catch (err) {
    console.error('deleteCustomer failed:', err.message);
    throw new Error(`deleteCustomer error: ${err.sqlMessage || err.message}`);
  }
}

async function authenticateCustomer({ username, password }) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const sql = `
    SELECT
      customer_id AS customerID,
      username,
      password,
      first_name AS firstName,
      last_name AS lastName,
      email,
      dob,
      gender,
      phone_number AS phone,
      points
    FROM customer
    WHERE username = ?
  `;
  console.log('Authenticating SQL:', sql.trim(), [username]);

  let rows;
  try {
    rows = await db.query(sql, [username]);
  } catch (err) {
    console.error('authenticateCustomer query failed:', err.message);
    throw new Error('Authentication failed');
  }

  const user = Array.isArray(rows[0]) ? rows[0][0] : rows[0];
  if (!user) {
    throw new Error('Invalid username or password');
  }

  // For now, plain-text comparison; replace with bcrypt if passwords are hashed
  if (user.password !== password) {
    throw new Error('Invalid username or password');
  }

  // Strip password before returning
  delete user.password;
  return user;
}

async function validateCustomer(input) {
  const { username, email, phone } = input;
  let sql, params, fieldName;
  if (username) {
    fieldName = 'Username';
    sql = 'SELECT 1 FROM customer WHERE username = ?';
    params = [username.trim()];
  } else if (email) {
    fieldName = 'Email';
    sql = 'SELECT 1 FROM customer WHERE email = ?';
    params = [email.trim()];
  } else if (phone) {
    fieldName = 'Phone number';
    sql = 'SELECT 1 FROM customer WHERE phone_number = ?';
    params = [phone.trim()];
  } else {
    // nothing to validate
    return { valid: true };
  }

  console.log(`validateCustomer SQL: ${sql}`, params);
  // execute query
  const result = await db.query(sql, params);
  // mysql2/promise returns [rows, fields]
  const rows = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;
  if (rows.length > 0) {
    throw new Error(`${fieldName} already in use`);
  }
  return { valid: true };
}

async function getCustomer(customerID) {
  const sql = `
    SELECT
      customer_id AS customerID,
      username,
      first_name AS firstName,
      last_name AS lastName,
      email,
      dob,
      gender,
      phone_number AS phone,
      points,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM customer
    WHERE customer_id = ?
  `;
  console.log('Executing SQL:', sql.trim(), [customerID]);
  try {
    const rows = await db.query(sql, [customerID]);
    const data = Array.isArray(rows) && !Array.isArray(rows[0]) ? rows : rows[0];
    return Array.isArray(data) ? data[0] : data;
  } catch (err) {
    console.error('getCustomer failed:', err.message);
    throw new Error(`getCustomer error: ${err.sqlMessage || err.message}`);
  }
}

async function updateCustomer(customerID, customerData) {
  const fields = [];
  const values = [];
  const mapping = {
    username: 'username',
    password: 'password',
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email',
    dob: 'dob',
    gender: 'gender',
    phone: 'phone_number',
    points: 'points'
  };

  for (const key in mapping) {
    if (customerData[key] !== undefined) {
      let val = customerData[key];
      if (key === 'dob' && typeof val === 'string') {
        const mdyMatch = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (mdyMatch) {
          const [, m, d, y] = mdyMatch;
          val = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        }
      }
      fields.push(`${mapping[key]} = ?`);
      values.push(val);
    }
  }

  if (fields.length === 0) return null;
  const sql = `
    UPDATE customer
    SET ${fields.join(', ')}
    WHERE customer_id = ?
  `;
  values.push(customerID);
  console.log('Executing SQL:', sql.trim(), values);

  try {
    const result = await db.query(sql, values);
    const affectedRows = result.affectedRows !== undefined ? result.affectedRows : (Array.isArray(result) && result[0]?.affectedRows) || 0;
    return { affectedRows };
  } catch (err) {
    console.error('updateCustomer failed:', err.message);
    throw new Error(`updateCustomer error: ${err.sqlMessage || err.message}`);
  }
}

async function getAllCustomers() {
  const sql = `
    SELECT
      customer_id AS customerID,
      username,
      first_name AS firstName,
      last_name AS lastName,
      email,
      dob,
      gender,
      phone_number AS phone,
      points,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM customer
  `;
  console.log('Executing SQL:', sql.trim());
  try {
    const rows = await db.query(sql);
    return Array.isArray(rows[0]) ? rows[0] : rows;
  } catch (err) {
    console.error('getAllCustomers failed:', err.message);
    throw new Error(`getAllCustomers error: ${err.sqlMessage || err.message}`);
  }
}

module.exports = {
  addCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  getAllCustomers,
  authenticateCustomer,
  validateCustomer
};
