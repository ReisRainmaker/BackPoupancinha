import { Request, Response } from 'express';
import Aluno from '../../models/Aluno';
import User from '../../models/User';
import Conta from '../../models/Conta';

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
            return res.status(201).json({
                id: selectedUser.id,
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
    static async getAlunoByUserid(req: Request, res: Response) {
        //usa email do login para encontrar user
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({ error: 'O id do usuário é obrigatório' })
        }
        const userIdNumber: number = +userId;
        try {
            
            const aluno = await Aluno.findOneBy({ userId: userIdNumber })
            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            return res.json(aluno)
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
        const userIdNumber: number = +idAluno;
        try {
            
            const contaAluno = await Conta.findOneBy({idAluno : userIdNumber })
            if (!contaAluno) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }

            return res.json(contaAluno)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }



}