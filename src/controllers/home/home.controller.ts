import { Request, Response } from 'express';
import Aluno from '../../models/Aluno';
import User from '../../models/User';
import Conta from '../../models/Conta';
import Professor from '../../models/Professor';
import Turma from '../../models/Turma';

export default class HomeController {
    static async getUserByEmail (req: Request, res: Response) {
        const { email } = req.params
        if (!email) {
            return res.status(400).json({ error: 'O email é obrigatório' })
        }
        try {
            const selectedUser = await User.findOneBy({ email: email })
            if (!selectedUser) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json({
                idUser: selectedUser.idUser,
                nome: selectedUser.nome,
                sobrenome: selectedUser.sobrenome,
                email: selectedUser.email,
                dataNascimento: selectedUser.dataNascimento,
                tipoUsuario: selectedUser.tipoUsuario,
              })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    
    }

    /// Solicita um usuário atravez do email (parametro) e com o usuário, solicita um aluno.
    static async getAlunoByidUser(req: Request, res: Response) {
        //usa email do login para encontrar user
        const { idUser } = req.params
        if (!idUser) {
            return res.status(400).json({ error: 'O id do usuário é obrigatório' })
        }
        const idUserNumber: number = +idUser;
        try {
            
            const aluno = await Aluno.findOneBy({ idUser: idUserNumber })
            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            return res.status(200).json(aluno)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }    

    /// Busca a conta do usuário atravez do id do aluno.
    static async getContaByidAluno (req: Request, res: Response) {
        const { idAluno } = req.params
        if (!idAluno) {
            return res.status(400).json({ error: 'O id do aluno é obrigatório' })
        }
        const idUserNumber: number = +idAluno;
        try {
            
            const contaAluno = await Conta.findOneBy({idAluno : idUserNumber })
            if (!contaAluno) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            return res.status(200).json(contaAluno)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    /// Solicita um usuário por seu id ///
    static async getUserById (req: Request, res: Response) {
        const { idUser } = req.params
        if (!idUser) {
            return res.status(400).json({ error: 'O id do usuário é obrigatório' })
        }
        const idUserNumber: number = +idUser;
        try {
            const selectedUser = await User.findOneBy({ idUser: idUserNumber })
            if (!selectedUser) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json({
                idUser: selectedUser.idUser,
                nome: selectedUser.nome,
                sobrenome: selectedUser.sobrenome,
                email: selectedUser.email,
                dataNascimento: selectedUser.dataNascimento,
                tipoUsuario: selectedUser.tipoUsuario,
              })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    
    }
    /// Solicita um professor atravez do id do usuário ///
    static async getProfessorByidUser(req: Request, res: Response) {
        const { idUser } = req.params
        if (!idUser) {
            return res.status(400).json({ error: 'O id do usuário é obrigatório' })
        }
        const idUserNumber: number = +idUser;
        try {          
            const professor = await Professor.findOneBy({ idUser: idUserNumber })
            if (!professor) {
                return res.status(404).json({ error: 'Professor não encontrado' });
            }
            return res.status(200).json(professor)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    } 
    /// Solicita uma turma atravez do id do professor ///
    static async getTurmasDoProf(req: Request, res: Response) {
        const { idProfessor } = req.params
        if (!idProfessor) {
            return res.status(400).json({ error: 'O id do professor é obrigatório' })
        }
        const professorIdNumber: number = +idProfessor;
        try {     
            const professor = await Turma.findBy({ idProfessor : professorIdNumber })
            if (!professor) {
                return res.status(404).json({ error: 'Turmas não encontradas' });
            }
            return res.status(200).json(professor)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    } 



}