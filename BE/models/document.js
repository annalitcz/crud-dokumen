const {pool} = require('./db');

exports.uploadDocument = async (userId, fileName, fileType, fileSize, fileData) => {
    const result = await pool.query(
        'INSERT INTO documents (user_id, file_name, file_type, file_size, file_data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, fileName, fileType, fileSize, fileData]
    );
    return result.rows[0];
};

exports.getDocumentsByUser = async (userId) => {
    const result = await pool.query('SELECT * FROM documents WHERE user_id = $1', [userId]);
    return result.rows;
};

exports.deleteDocumentById = async (id) => {
    const result = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};