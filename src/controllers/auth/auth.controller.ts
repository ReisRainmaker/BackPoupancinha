import { Request, Response } from 'express'
import User from '../../models/User'
import Token from '../../models/Tokens'
import Aluno from '../../models/Aluno'
import Professor from '../../models/Professor'
import bcrypt from 'bcrypt'
import Conta from '../../models/Conta'
import Turma from '../../models/Turma'

export default class AuthController {

  ////////////////// Inserir um novo usuário ///////////////////////
  static async register(req: Request, res: Response) {
    const { name, sobreNome, email, senha, dataNascimento, tipoUsuario, turma } = req.body

    if (!name) return res.status(400).json({ error: 'O nome é obrigatório' })
    if (!sobreNome) return res.status(400).json({ error: 'O sobrenome é obrigatório' })
    if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
    if (!senha) return res.status(400).json({ error: 'A senha é obrigatória' })
    if (!dataNascimento) return res.status(400).json({ error: 'A data de nascimento é obrigatória' })
    if (!tipoUsuario) return res.status(400).json({ error: 'O tipo de usuário deve ser definido' })

    const user = new User()
    user.nome = name
    user.sobrenome = sobreNome
    user.email = email
    user.dataNascimento = dataNascimento
    user.tipoUsuario = tipoUsuario
    user.senha = bcrypt.hashSync(senha, 10) // Gera a hash da senha com bcrypt - para não salvar a senha em texto puro


    // Crie uma instância do tipo de usuário (Aluno ou Professor)
    let userType;
    let alunoConta;

    if (tipoUsuario === 'Aluno') {
      //Cria Aluno
      userType = new Aluno();
      const turmaDoAluno = await Turma.findOneBy({ nomeTurma: String(turma) });
      if (turmaDoAluno) {
        userType.turma = turmaDoAluno
        userType.idTurma = turmaDoAluno.idTurma
      } else {
        return res.status(401).json({ error: 'A turma informada não existe' })
      }

      // Se é aluno, cria conta e conta com saldo 0
      alunoConta = new Conta();
      alunoConta.aluno = userType;
      alunoConta.saldoAtual = 0
    } else if (tipoUsuario === 'Professor') {
      //Cria professor
      userType = new Professor();
    } else {
      return res.status(400).json({ error: 'Tipo de usuário inválido' });
    }
    // Associe o tipo de usuário ao usuário

    // Salve o usuário e o tipo de usuário no banco de dados em uma única transação
    try {
      if (tipoUsuario === 'Aluno') {
        await user.save();
        userType.user = user;
        userType.idUser = user.idUser;
        await userType.save();
        await alunoConta?.save();
      } else {
        await user.save();
        userType.user = user;
        userType.idUser = user.idUser;
        await userType.save();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o usuário' });
    }

    // Não vamos retornar a hash da senha
    return res.status(201).json({
      id: user.idUser,
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      dataNascimento: user.dataNascimento,
      tipoUsuario: user.tipoUsuario,
    })
  }


  ////////////////// Login  ///////////////////////
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
    if (!password) return res.status(400).json({ error: 'A senha é obrigatória' })

    const user = await User.findOneBy({ email })
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' })

    const passwordMatch = bcrypt.compareSync(password, user.senha)
    if (!passwordMatch) return res.status(401).json({ error: 'Senha inválida' })

    // Remove todos os tokens antigos do usuário
    await Token.delete(
      { user: { idUser: user.idUser } }
    )

    const token = new Token()
    // Gera um token aleatório
    token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    // Define a data de expiração do token para 1 hora
    token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    // Gera um refresh token aleatório
    token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)

    token.user = user
    token.idUser = user.idUser
    await token.save()

    return res.json({
      nome: user.nome,
      sobrenome: user.sobrenome,
      idUser: token.idUser,
      token: token.token,
      expiresAt: token.expiresAt,
      refreshToken: token.refreshToken
    })
  }


  /////////////////  Refresh  ///////////////////////
  static async refresh(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) return res.status(400).json({ error: 'O refresh token é obrigatório' })

    const token = await Token.findOneBy({ refreshToken: authorization })
    if (!token) return res.status(401).json({ error: 'Refresh token inválido' })

    // Verifica se o refresh token ainda é válido
    if (token.expiresAt < new Date()) {
      await token.remove()
      return res.status(401).json({ error: 'Refresh token expirado' })
    }

    // Atualiza os tokens
    token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    await token.save()

    return res.json({
      token: token.token,
      expiresAt: token.expiresAt,
      refreshToken: token.refreshToken
    })
  }


  ///////////////////// Logout  ////////////////////////////
  static async logout(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) return res.status(400).json({ error: 'O token é obrigatório' })

    // Verifica se o token existe
    const userToken = await Token.findOneBy({ token: authorization })
    if (!userToken) return res.status(401).json({ error: 'Token inválido' })

    // Remove o token
    await userToken.remove()

    // Retorna uma resposta vazia
    return res.status(204).json()
  }
}