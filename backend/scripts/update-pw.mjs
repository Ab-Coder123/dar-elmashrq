import pg from 'pg'
import bcrypt from 'bcryptjs'

async function updatePassword() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.iaecsdllnlkiwpxzbtbl:DarElmashrq2026%23@aws-0-eu-west-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
  })
  await client.connect()
  const password = 'Mgc' + '$' + '5555'
  const hash = await bcrypt.hash(password, 10)
  console.log('Generated hash for password length', password.length, ':', hash)
  const isValid = await bcrypt.compare(password, hash)
  console.log('Matches test:', isValid)

  await client.query('UPDATE admin_users SET password_hash = $1 WHERE email = $2', [hash, 'elmashrq5555@gmail.com'])
  console.log('Successfully updated password_hash for elmashrq5555@gmail.com')

  const res = await client.query('SELECT id, email, password_hash, is_active FROM admin_users WHERE email = $1', ['elmashrq5555@gmail.com'])
  console.log('Row verified in database:', res.rows[0])
  await client.end()
}

updatePassword().catch(console.error)
